import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import { getReviews } from '@/services/reviews';

export default async function Home() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Portfolio Short Section */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-black font-heading text-primary uppercase tracking-tighter">
                Nossos <span className="text-accent underline decoration-4 underline-offset-8">Trabalhos.</span>
              </h2>
              <p className="text-gray-500 font-body text-lg max-w-prose">
                Excelência técnica em cada detalhe. Veja alguns dos nossos projetos recentes de montagem de móveis sob medida.
              </p>
            </div>
            <button className="text-primary font-bold border-b-2 border-accent hover:text-accent transition-colors">
              VER GALERIA COMPLETA →
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square relative overflow-hidden group">
                <img 
                  src={"https://images.unsplash.com/photo-" + (1555000000000 + i) + "?w=400&h=400&fit=crop"} 
                  alt="Trabalho Marcos Montador"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                  <p className="text-white font-heading font-bold text-lg">Cozinha Planejada #{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px]">
             <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=800&fit=crop" alt="Equipe Marcos Montador" className="w-full h-full object-cover rounded-sm shadow-xl" />
             <div className="absolute -bottom-6 -right-6 bg-accent p-8 text-primary font-black text-3xl shadow-lg hidden lg:block">
               10+ ANOS <br/> DE EXPERIÊNCIA
             </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black font-heading text-primary uppercase tracking-tighter">
              Tradição e <span className="text-accent underline decoration-4 underline-offset-8">Qualidade.</span>
            </h2>
            <p className="text-gray-600 font-body text-xl leading-relaxed max-w-prose">
              Iniciado em 2014, o projeto Marcos Montador nasceu com um propósito claro: oferecer a montagem de móveis planejados mais precisa do mercado.
            </p>
            <p className="text-gray-500 font-body text-lg leading-relaxed max-w-prose">
              Não apenas montamos móveis; realizamos sonhos de ambientes funcionais e elegantes. Cada parafuso e cada ajuste é feito com o cuidado de quem entende que o seu lar é o seu bem mais precioso.
            </p>
          </div>
        </div>
      </section>

      <ReviewsSection initialReviews={reviews} />

      {/* Footer / Contact Preview */}
      <footer id="contato" className="bg-primary pt-24 pb-12 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 mb-24">
            <div className="space-y-8">
              <h2 className="text-6xl font-black font-heading tracking-tighter decoration-accent decoration-8">PRONTO PARA <br/> MONTAR?</h2>
              <p className="text-xl text-white/60 font-body leading-relaxed max-w-md">
                Entre em contato agora mesmo e garanta a melhor montagem para seus móveis.
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full">📞</span>
                  (11) 99999-9999
                </p>
                <p className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full">✉️</span>
                  contato@marcosmontador.com.br
                </p>
              </div>
              
              <div className="flex gap-6 items-center pt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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
            
            <div className="bg-white p-12 text-primary shadow-2xl">
              <h3 className="text-2xl font-black font-heading mb-8">Solicitar Orçamento</h3>
              <form className="space-y-6">
                <input type="text" placeholder="Seu Nome" className="w-full p-4 bg-gray-50 border-b-2 border-gray-100 focus:border-accent outline-none transition-colors" />
                <input type="email" placeholder="Seu Email" className="w-full p-4 bg-gray-50 border-b-2 border-gray-100 focus:border-accent outline-none transition-colors" />
                <textarea placeholder="Fale sobre seu projeto..." rows={4} className="w-full p-4 bg-gray-50 border-b-2 border-gray-100 focus:border-accent outline-none transition-colors" />
                <button className="w-full py-5 bg-accent text-primary font-black text-xl hover:bg-accent-yellow transition-all duration-300">
                  ENVIAR AGORA
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm tracking-widest uppercase">
            <p>© 2026 MARCOS MONTADOR. TODOS OS DIREITOS RESERVADOS.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-accent transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-accent transition-colors">FACEBOOK</a>
              <a href="#" className="hover:text-accent transition-colors">WHATSAPP</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
