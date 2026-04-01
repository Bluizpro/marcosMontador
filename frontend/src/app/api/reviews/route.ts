import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Maps API Key or Place ID missing. Returning empty reviews.');
    return NextResponse.json([]);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return NextResponse.json([]);
    }

    // Map Google Reviews to our internal Review interface
    const formattedReviews = data.result.reviews.map((rev: any, index: number) => ({
      id: `google-${index}-${rev.time}`,
      author_name: rev.author_name,
      rating: rev.rating,
      text: rev.text,
      profile_photo_url: rev.profile_photo_url,
      source: 'google',
      created_at: new Date(rev.time * 1000).toISOString(),
    }));

    return NextResponse.json(formattedReviews);
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
