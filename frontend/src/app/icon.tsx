import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  // Read the local logo file
  const logoPath = join(process.cwd(), 'public', 'marcos_montador.png');
  const logoBuffer = await readFile(logoPath);
  
  // Explicitly convert Buffer to ArrayBuffer to avoid DataView errors in some environments
  const logoData = logoBuffer.buffer.slice(
    logoBuffer.byteOffset,
    logoBuffer.byteOffset + logoBuffer.byteLength
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: '#2d2321',
          border: '1px solid #c5a059',
          overflow: 'hidden',
        }}
      >
        <img
          // @ts-ignore
          src={logoData}
          alt="M"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

