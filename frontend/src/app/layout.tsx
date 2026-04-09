import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["100", "300", "400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Marcos Montador",
  description: "Montagem profissional de móveis com qualidade e elegância.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${lexend.variable} ${sourceSans.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
