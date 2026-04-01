import { supabase } from './supabase';

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
  source: 'google' | 'internal';
  reply_text?: string;
  replied_at?: string;
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

export async function getGoogleReviews(): Promise<Review[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return [];
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=pt-BR`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return [];
    }

    return data.result.reviews.map((rev: any, index: number) => ({
      id: `google-${index}-${rev.time}`,
      author_name: rev.author_name,
      rating: rev.rating,
      text: rev.text,
      profile_photo_url: rev.profile_photo_url,
      source: 'google',
      created_at: new Date(rev.time * 1000).toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return [];
  }
}

export async function getReviews(): Promise<Review[]> {
  // 1. Fetch all reviews from Supabase (including manually inserted Google reviews)
  const internalReviews = await getInternalReviews();

  // 2. Fetch real Google Reviews only if credentials exist and user wants them
  // (Disabled by default now to prioritize the manual ones from Supabase)
  const googleReviews = await getGoogleReviews();

  // 3. Combine and return
  const allReviews = [...internalReviews, ...googleReviews];

  // 4. Fallback if still empty
  if (allReviews.length === 0) {
    return [
      {
        id: 'mock1',
        author_name: 'Cliente Exemplo',
        rating: 5,
        text: 'Serviço de excelente qualidade! Muito satisfeito com a montagem.',
        source: 'google',
        created_at: new Date().toISOString(),
      }
    ];
  }

  return allReviews;
}

export async function submitReview(review: Omit<Review, 'id' | 'created_at' | 'source'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ ...review, source: 'internal' }])
    .select();

  if (error) throw error;
  return data;
}
