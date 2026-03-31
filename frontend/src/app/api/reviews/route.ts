import { NextResponse } from 'next/server';

// Mock data until Place ID and API Key are provided
const MOCK_GOOGLE_REVIEWS = [
  {
    id: 'g1',
    author_name: 'Maria Silva',
    rating: 5,
    text: 'Profissional excelente! Montou meu guarda-roupa planejado com precisão e deixou tudo impecável.',
    profile_photo_url: 'https://i.pravatar.cc/150?u=maria',
    source: 'google',
    created_at: new Date().toISOString(),
  },
  {
    id: 'g2',
    author_name: 'João Santos',
    rating: 5,
    text: 'Rápido, profissional e com preço justo. Já contratei 3 vezes e sempre com excelente resultado!',
    profile_photo_url: 'https://i.pravatar.cc/150?u=joao',
    source: 'google',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  // TODO: Add real Google Places API fetch logic here when credentials are ready
  // const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  // const placeId = process.env.GOOGLE_PLACE_ID;
  
  return NextResponse.json(MOCK_GOOGLE_REVIEWS);
}
