import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Montador - Móveis Planejados",
  description: "Montagem profissional de móveis planejados com qualidade e elegância.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
