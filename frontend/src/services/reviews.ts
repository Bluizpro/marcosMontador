import { supabase } from './supabase';

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
  source: 'google' | 'internal';
  created_at: string;
}

export async function getInternalReviews(): Promise<Review[]> {
  // Check if we are using placeholder credentials
  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') || 
      !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Supabase credentials not configured. Skipping internal reviews fetch.');
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching internal reviews:', error);
    return [];
  }
  return data || [];
}

export async function getReviews(): Promise<Review[]> {
  // 1. Fetch internal reviews directly
  const internalReviews = await getInternalReviews();

  // 2. Mock Google Reviews (Avoid internal fetch during build)
  // In production, this could call a server-side only Google API service
  const googleReviews: Review[] = [
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

  return [...internalReviews, ...googleReviews];
}

export async function submitReview(review: Omit<Review, 'id' | 'created_at' | 'source'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ ...review, source: 'internal' }])
    .select();

  if (error) throw error;
  return data;
}
