'use client';

import { useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getGalleryImages } from '@/app/actions';

const initialCategories = [
  {
    id: 'quartos',
    name: 'QUARTOS',
    cover: '/galeria/quartos/quarto.png',
    description: 'Montagem de camas, guarda-roupas, criados-mudos e armários para dormitórios de todos os estilos.',
    images: [] as string[]
  },
  {
    id: 'salas',
    name: 'SALAS',
    cover: '/galeria/salas/sala66.png',
    description: 'Instalação de painéis de TV, racks, estantes e sofás para ambientes de estar modernos.',
    images: [] as string[]
  },
  {
    id: 'cozinhas',
    name: 'COZINHAS',
    cover: '/galeria/cozinhas/cozinha3.jpeg',
    description: 'Montagem completa de armários de cozinha, tampos, gabinetes e ferragens em geral.',
    images: [] as string[]
  },
  {
    id: 'escritórios',
    name: 'ESCRITÓRIOS',
    cover: '/galeria/escritorios/marcos_montador_gallery.webp',
    description: 'Home offices, mesas e estantes com acabamento impecável.',
    images: [] as string[]
  },
  {
    id: 'lazer',
    name: 'LAZER',
    cover: '/galeria/lazer/lazer.jpeg',
    description: 'Montagem de mesas de bilhar, sinuca e móveis para áreas de entretenimento.',
    images: [] as string[]
  }
];

export default function CategoryGallery() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      const { success, data } = await getGalleryImages();
      if (success && data) {
        console.log('Imagens carregadas:', data.length);
        const updated = initialCategories.map(cat => {
          const catImages = data
            .filter(img => img.category === cat.id)
            .map(img => img.url);
          
          return {
            ...cat,
            cover: catImages[0] || cat.cover, 
            images: catImages
          };
        });
        setCategories(updated);
      }
      setLoading(false);
    }
    loadImages();
  }, []);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);
  const allImages = categories.flatMap(cat => cat.images.map(img => ({ url: img, category: cat.name })));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-accent gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-bold tracking-widest text-sm">CARREGANDO GALERIA...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-end -mt-12 md:-mt-20 relative z-10 p-4 md:p-0">
        <button
          onClick={() => setShowAll(true)}
          className="text-primary font-bold border-b-2 border-accent hover:text-accent transition-colors text-sm md:text-base"
        >
          VER GALERIA COMPLETA →
        </button>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory modern-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategoryId(cat.id);
              sendGAEvent({ event: 'view_category', value: cat.id });
            }}
            className="min-w-[280px] sm:min-w-[320px] aspect-[4/5] relative overflow-hidden group rounded-2xl shadow-lg cursor-pointer snap-start"
          >
            <img
              src={cat.cover}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => console.error('Erro ao carregar capa:', cat.cover)}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 transition-colors group-hover:bg-black/60">
              <div className="border-2 border-white/40 px-8 py-4 backdrop-blur-sm group-hover:border-accent group-hover:scale-110 transition-all font-heading">
                <p className="text-white font-black text-2xl tracking-widest group-hover:text-accent">{cat.name}</p>
                <p className="text-white/0 group-hover:text-white/60 text-[10px] text-center mt-2 font-bold tracking-tighter uppercase transition-all">Clique para ver fotos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Gallery Modal */}
      {showAll && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
          <div
            className="absolute inset-0 bg-[var(--primary)] opacity-95 backdrop-blur-md"
            onClick={() => setShowAll(false)}
          />

          <div className="relative w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 md:p-8 border-b flex items-center justify-between bg-white text-primary">
              <div>
                <h3 className="text-2xl md:text-3xl font-black font-heading uppercase">
                  Galeria <span className="text-accent">Completa</span>
                </h3>
                <p className="text-xs md:text-base text-gray-500 mt-1 font-body">Veja todos os nossos trabalhos de montagem.</p>
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setExpandedImage(img.url)}
                    className="aspect-square relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all cursor-zoom-in"
                  >
                    <img
                      src={img.url}
                      alt={`Montagem ${img.category}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => console.error('Erro ao carregar imagem da galeria:', img.url)}
                    />
                    <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/90 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-black text-primary shadow-sm">
                      {img.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <p className="text-xs md:text-base text-gray-600 font-body italic text-center md:text-left">Gostou do nosso trabalho? Peça seu orçamento!</p>
              <a
                href="#contato"
                onClick={() => setShowAll(false)}
                style={{ backgroundColor: '#c5a059', color: 'var(--primary)' }}
                className="w-full md:w-auto text-center px-8 py-3 font-black rounded-full hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Category "Folder" */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 font-body">
            <div className="absolute inset-0 bg-[var(--primary)] opacity-95 backdrop-blur-md"
            onClick={() => setSelectedCategoryId(null)}
          />

          <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 md:p-8 border-b flex items-center justify-between bg-white text-primary">
              <div>
                <h3 className="text-2xl md:text-3xl font-black font-heading uppercase">
                  Galeria: <span className="text-accent">{selectedCategory.name}</span>
                </h3>
                <p className="text-xs md:text-base text-gray-500 mt-1 md:mt-2 max-w-xl">{selectedCategory.description}</p>
              </div>
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {selectedCategory.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setExpandedImage(img)}
                    className="aspect-square relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-zoom-in group"
                  >
                    <img
                      src={img}
                      alt={`${selectedCategory.name} - ${idx}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => console.error('Erro ao carregar imagem da categoria:', img)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="p-6 md:p-8 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <p className="text-xs md:text-base text-gray-600 font-body italic text-center md:text-left">
                Gostou deste estilo? Peça um orçamento!
              </p>
              <a
                href="#contato"
                onClick={() => setSelectedCategoryId(null)}
                style={{ backgroundColor: '#c5a059', color: '#14100f' }}
                className="w-full md:w-auto text-center px-10 py-4 font-black text-lg rounded-full hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox - Expanded Image */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setExpandedImage(null)}
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-10"
          >
            <X size={40} />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
            <img
              src={expandedImage}
              alt="Imagem expandida"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
