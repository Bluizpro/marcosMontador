#!/bin/bash
echo "Acesse: http://localhost:3000"

# Instalar dependências se necessário e iniciar backend
(cd backend && npm install && npm start) &

# Iniciar frontend
(cd frontend && npm run dev)
