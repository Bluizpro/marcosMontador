import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://bbgempreemdimentos.online/webhook/receber-mensagem';
const MAX_BODY_SIZE = 5_000; // 5KB limit

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max 5 requests
const RATE_WINDOW_MS = 60_000; // per 60 seconds

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

function sanitizeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ipKey = getRateLimitKey(req);
  if (isRateLimited(ipKey)) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um momento.' },
      { status: 429 }
    );
  }

  // Body size guard
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload muito grande.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Whitelist and validate only allowed fields
  const nome = sanitizeString(raw.nome, 100);
  const telefone = sanitizeString(raw.telefone, 20);
  const mensagem = sanitizeString(raw.mensagem, 1000) ?? 'Olá, gostaria de fazer um orçamento';

  if (!nome) {
    return NextResponse.json({ error: 'Nome é obrigatório (até 100 caracteres).' }, { status: 422 });
  }
  if (!telefone) {
    return NextResponse.json({ error: 'Telefone é obrigatório (até 20 caracteres).' }, { status: 422 });
  }

  const payload = {
    nome,
    telefone,
    mensagem,
    origem: 'Formulário de Orçamento - Marcos Montador',
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000), // 10s timeout
    });

    if (!response.ok) {
      console.error(`Webhook error: ${response.status}`);
      return NextResponse.json({ error: 'Erro ao enviar mensagem.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
