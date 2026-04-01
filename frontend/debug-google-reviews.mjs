import 'dotenv/config';

async function testGoogleFetch() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  console.log('API Key present:', !!apiKey);
  console.log('Place ID present:', !!placeId);

  if (!apiKey || !placeId) {
    console.error('Credentials missing');
    return;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('API Response Status:', data.status);
    if (data.result && data.result.reviews) {
      console.log('Found reviews:', data.result.reviews.length);
      console.log('First review author:', data.result.reviews[0].author_name);
    } else {
      console.log('No reviews found in result or error:', data.error_message || 'No result');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testGoogleFetch();
