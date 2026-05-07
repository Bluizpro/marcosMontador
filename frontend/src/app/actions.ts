'use server';

// dream: 'Marcos Montador - Production Logic'
// description: 'Server action to submit reviews and revalidate the home page cache immediately.'

import { revalidatePath } from 'next/cache';
import { supabase } from '@/services/supabase';
import { Review } from '@/services/reviews';

export async function submitReviewAction(review: Omit<Review, 'id' | 'created_at' | 'source'>) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ ...review, source: 'internal' }])
      .select();

    if (error) {
      console.error('Database error during review submission:', error);
      return { success: false, error: 'Falha ao salvar depoimento no banco de dados.' };
    }

    // CRITICAL: This clears the Next.js cache for the home page on Netlify!
    revalidatePath('/');
    
    return { success: true, data };
  } catch (err) {
    console.error('Server Action Error:', err);
    return { success: false, error: 'Ocorreu um erro ao processar seu depoimento.' };
  }
}

export async function getGalleryImages() {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('category, url')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    return { success: false, data: [] };
  }
}
