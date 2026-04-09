import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Optimized Background Image */}
      <Image
        src="/marcosmontador.jpg"
        alt="Marcos Montador Background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-80 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading leading-none text-white drop-shadow-2xl">
            Montagem <br />
            <span style={{ color: '#c5a059' }}>Impecável.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-xl font-body leading-relaxed drop-shadow-lg">
            Montador de móveis com mais de 20 anos de experiência, precisão e confiança para o seu lar.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="#contato"
              style={{ backgroundColor: '#c5a059', color: 'var(--primary)' }}
              className="px-10 py-5 font-bold text-xl rounded-full hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl"
            >
              SOLICITAR ORÇAMENTO
            </Link>
            <Link
              href="#galeria"
              className="px-10 py-5 border-2 border-white/20 text-white font-bold text-xl rounded-full hover:bg-white hover:text-[var(--primary)] transition-all duration-300"
            >
              VER GALERIA
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
