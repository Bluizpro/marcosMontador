import { GoogleAnalytics } from '@next/third-parties/google';
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

const siteUrl = "https://marcosmontador.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marcos Montador | Montagem de Móveis no Rio de Janeiro",
    template: "%s | Marcos Montador",
  },
  description:
    "Montagem profissional de móveis com mais de 20 anos de experiência no Rio de Janeiro. Salas, quartos e escritórios. Ligue agora: (21) 97928-8721.",
  keywords: [
    "montagem de móveis",
    "montador de móveis Rio de Janeiro",
    "montagem de móveis RJ",
    "montador profissional",
    "montagem de armário",
    "montagem de cozinha",
    "montagem de quarto",
    "montagem de escritório",
    "Marcos Montador",
  ],
  authors: [{ name: "Marcos Montador" }],
  creator: "Marcos Montador",
  publisher: "Marcos Montador",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Marcos Montador",
    title: "Marcos Montador | Montagem de Móveis no Rio de Janeiro",
    description:
      "Montagem profissional de móveis com mais de 20 anos de experiência no Rio de Janeiro. Salas, quartos e escritórios.",
    images: [
      {
        url: "/marcosmontador.jpg",
        width: 1200,
        height: 630,
        alt: "Marcos Montador - Montagem Profissional de Móveis RJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Montador | Montagem de Móveis no Rio de Janeiro",
    description:
      "Montagem profissional de móveis com mais de 20 anos de experiência. Contato: (21) 97928-8721.",
    images: ["/marcosmontador.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: 'seu-codigo-google-search-console-aqui',
  },
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
      <GoogleAnalytics gaId="G-QTHB7WL2RD" />

    </html>
  );
}
