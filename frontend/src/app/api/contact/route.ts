import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = 'https://bbgempreemdimentos.online/webhook/receber-mensagem';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'Erro no webhook', details: errorText }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na rota de API de contato:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
