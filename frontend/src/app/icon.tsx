import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#1a1210',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
          border: '1.5px solid #c5a059',
          overflow: 'hidden',
        }}
      >
        <img
          src="https://marcosmontador.netlify.app/favicon-32x32.png"
          alt="M"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
