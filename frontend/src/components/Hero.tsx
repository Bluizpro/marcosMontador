import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-primary pt-20">
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary skew-x-12 translate-x-20 z-0 hidden lg:block opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading leading-none text-white drop-shadow-sm">
            Montagem <br />
            <span className="text-accent">Impecável.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-xl font-body leading-relaxed drop-shadow-sm">
            Especialista em móveis planejados com mais de 10 anos de precisão e confiança para o seu lar.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="#contato" 
              className="px-8 py-4 bg-accent text-primary font-bold text-lg rounded-sm hover:bg-accent-yellow transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              SOLICITAR ORÇAMENTO
            </Link>
            <Link 
              href="#portfolio" 
              className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-sm hover:bg-white hover:text-primary transition-all duration-300"
            >
              VER PORTFÓLIO
            </Link>
          </div>
        </div>
        
        <div className="hidden lg:block relative h-[600px] animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="absolute inset-0 bg-accent/10 border-2 border-accent/20 translate-x-4 translate-y-4" />
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop" 
            alt="Móveis Planejados de Luxo" 
            className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
