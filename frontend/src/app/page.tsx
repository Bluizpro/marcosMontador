import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import { getReviews } from '@/services/reviews';
import ContactForm from '@/components/ContactForm';
import CategoryGallery from '@/components/CategoryGallery';
import { Instagram, Facebook } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Marcos Montador',
  description: 'Montagem profissional de móveis com mais de 20 anos de experiência no Rio de Janeiro.',
  url: 'https://marcosmontador.com.br',
  telephone: '+55-21-97928-8721',
  email: 'marcosadriano0102@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rio de Janeiro',
    addressRegion: 'RJ',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -22.9068,
    longitude: -43.1729,
  },
  sameAs: [
    'https://www.instagram.com/marcos_montador_rj/',
    'https://www.facebook.com/MarcosMontador/',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
  priceRange: '$$',
  image: 'https://marcosmontador.com.br/marcosmontador.jpg',
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -22.9068,
      longitude: -43.1729,
    },
    geoRadius: '50000',
  },
};

export default async function Home() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <Hero />

      {/* Gallery Section */}
      <section id="galeria" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-black font-heading text-primary uppercase tracking-tighter">
                Nossos <span className="text-accent underline decoration-4 underline-offset-8">Trabalhos.</span>
              </h2>
              <p className="text-gray-500 font-body text-base md:text-lg max-w-prose">
                Excelência técnica em cada detalhe. Veja nossos trabalhos divididos por ambientes.
              </p>
            </div>
          </div>

          <CategoryGallery />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-24 bg-white border-b border-gray-100 font-body">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative h-[350px] md:h-[500px]">
            <Image 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" 
              alt="Equipe Marcos Montador" 
              fill
              className="object-cover rounded-2xl shadow-xl hover:scale-[1.01] transition-transform duration-500" 
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-accent p-6 md:p-8 text-primary font-black text-xl md:text-3xl shadow-lg">
              20+ ANOS <br className="hidden md:block" /> DE EXPERIÊNCIA
            </div>
          </div>
          <div className="space-y-6 pt-8 md:pt-0">
            <h2 className="text-3xl md:text-5xl font-black font-heading text-primary uppercase tracking-tighter">
              Tradição e <span className="text-accent underline decoration-4 underline-offset-8">Qualidade.</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-prose">
              Com décadas de atuação no mercado, Marcos Montador consolidou sua trajetória com um propósito claro: oferecer a montagem de móveis mais precisa e confiável do mercado.
            </p>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-prose">
              Não apenas montamos móveis; realizamos sonhos de ambientes funcionais e elegantes. Cada parafuso e cada ajuste é feito com o cuidado de quem entende que o seu lar é o seu bem mais precioso.
            </p>
          </div>
        </div>
      </section>

      <ReviewsSection initialReviews={reviews} />

      {/* Footer / Contact Preview */}
      <footer id="contato" style={{ backgroundColor: 'var(--primary)' }} className="pt-24 pb-12 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 mb-24">
            <div className="space-y-8">
              <h2 className="text-6xl font-black font-heading tracking-tighter decoration-accent decoration-8">PRONTO PARA <br /> MONTAR?</h2>
              <p className="text-xl text-white/60 font-body leading-relaxed max-w-md">
                Entre em contato agora mesmo e garanta a melhor montagem para seus móveis com um profissional de confiança.
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full">📞</span>
                  (21) 97928-8721
                </p>
                <p className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full">✉️</span>
                  marcosadriano0102@gmail.com
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pt-8">


                <div className="space-y-3">
                  <p className="text-[10px] font-black tracking-widest uppercase text-white/40">Siga-nos</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/marcos_montador_rj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                      <Instagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/MarcosMontador/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 items-center pt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center">
                  <span className="text-3xl">🛡️</span>
                  <span className="text-[10px] tracking-tighter">MONTAGEM SEGURA</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl">🏆</span>
                  <span className="text-[10px] tracking-tighter">PRÊMIO QUALIDADE 2024</span>
                </div>
              </div>
            </div>


            <ContactForm />
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm tracking-widest uppercase">
            <p>© 2026 MARCOS MONTADOR. TODOS OS DIREITOS RESERVADOS.</p>

          </div>

        </div>
      </footer>
      <WhatsAppButton />
    </main>
  );
}
