'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const categories = [
  {
    id: 'quartos',
    name: 'QUARTOS',
    cover: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&h=1000&fit=crop',
    description: 'Montagem de camas, guarda-roupas, criados-mudos e armários para dormitórios de todos os estilos.',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c20360a59?w=800&h=800&fit=crop'
    ]
  },
  {
    id: 'salas',
    name: 'SALAS',
    cover: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=1000&fit=crop',
    description: 'Instalação de painéis de TV, racks, estantes e sofás para ambientes de estar modernos.',
    images: [
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c20360a59?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop'
    ]
  },
  {
    id: 'cozinhas',
    name: 'COZINHAS',
    cover: 'https://images.unsplash.com/photo-1556911223-e4524c73c480?w=800&h=1000&fit=crop',
    description: 'Montagem completa de armários de cozinha, tampos, gabinetes e ferragens em geral.',
    images: [
      'https://images.unsplash.com/photo-1556911223-e4524c73c480?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556909212-d5b604bc9291?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556185803-04e339f4007a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1539922980492-38f6673af8dd?w=800&h=800&fit=crop'
    ]
  },
  {
    id: 'escritórios',
    name: 'ESCRITÓRIOS',
    cover: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=1000&fit=crop',
    description: 'Organização de home offices, mesas de escritório, prateleiras e gaveteiros funcionais.',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518455027359-f3f813b062df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534489872173-042971848a27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop'
    ]
  }
];

export default function CategoryGallery() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const allImages = categories.flatMap(cat => cat.images.map(img => ({ url: img, category: cat.name })));

  return (
    <div className="space-y-12">
      <div className="flex justify-end -mt-20 relative z-10">
        <button 
          onClick={() => setShowAll(true)}
          className="text-primary font-bold border-b-2 border-accent hover:text-accent transition-colors hidden md:block"
        >
          VER GALERIA COMPLETA →
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => setSelectedCategory(cat)}
          className="aspect-[4/5] relative overflow-hidden group rounded-2xl shadow-lg cursor-pointer"
        >
          <img 
            src={cat.cover} 
            alt={cat.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 transition-colors group-hover:bg-black/60">
            <div className="border-2 border-white/40 px-8 py-4 backdrop-blur-sm group-hover:border-accent group-hover:scale-110 transition-all">
              <p className="text-white font-heading font-black text-2xl tracking-widest group-hover:text-accent">{cat.name}</p>
              <p className="text-white/0 group-hover:text-white/60 text-[10px] text-center mt-2 font-bold tracking-tighter uppercase transition-all">Clique para ver fotos</p>
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Full Gallery Modal */}
      {showAll && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-[var(--primary)] opacity-95 backdrop-blur-md" 
            onClick={() => setShowAll(false)}
          />
          
          <div className="relative w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-8 border-b flex items-center justify-between bg-white text-primary">
              <div>
                <h3 className="text-3xl font-black font-heading uppercase">
                  Galeria <span className="text-accent">Completa</span>
                </h3>
                <p className="text-gray-500 mt-2 font-body">Veja todos os nossos trabalhos de montagem em um só lugar.</p>
              </div>
              <button 
                onClick={() => setShowAll(false)}
                className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <div key={idx} className="aspect-square relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-zoom-in">
                    <img 
                      src={img.url} 
                      alt={`Montagem ${img.category}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-primary shadow-sm">
                      {img.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-600 font-body italic">Gostou do nosso trabalho? Peça seu orçamento agora!</p>
              <a 
                href="#contato"
                onClick={() => setShowAll(false)}
                style={{ backgroundColor: '#c5a059', color: 'var(--primary)' }}
                className="px-8 py-3 font-black rounded-full hover:opacity-90 transition-all shadow-lg"
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Category "Folder" */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-[var(--primary)] opacity-95 backdrop-blur-md" 
            onClick={() => setSelectedCategory(null)}
          />
          
          <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-8 border-b flex items-center justify-between bg-white text-primary">
              <div>
                <h3 className="text-3xl font-black font-heading uppercase">
                  Galeria: <span className="text-accent">{selectedCategory.name}</span>
                </h3>
                <p className="text-gray-500 mt-2 font-body max-w-xl">{selectedCategory.description}</p>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {selectedCategory.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-zoom-in group">
                    <img 
                      src={img} 
                      alt={`${selectedCategory.name} - ${idx}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="p-8 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-600 font-body italic text-center md:text-left">
                Gostou deste estilo? Peça um orçamento sem compromisso!
              </p>
              <a 
                href="#contato"
                onClick={() => setSelectedCategory(null)}
                style={{ backgroundColor: '#c5a059', color: '#14100f' }}
                className="px-10 py-4 font-black text-lg rounded-full hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
