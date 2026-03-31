# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the application
COPY frontend/ .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
