'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const categories = [
  {
    id: 'quartos',
    name: 'QUARTOS',
    cover: '/galeria/quartos/quarto.png',
    description: 'Montagem de camas, guarda-roupas, criados-mudos e armários para dormitórios de todos os estilos.',
    images: [
      "/galeria/quartos/quarto.png", "/galeria/quartos/quarto2.jpeg", "/galeria/quartos/quarto22.jpeg",
      "/galeria/quartos/quarto3.jpeg", "/galeria/quartos/quarto32.jpeg", "/galeria/quartos/quarto34.jpeg",
      "/galeria/quartos/quarto37.jpeg", "/galeria/quartos/quarto38.jpeg",
      "/galeria/quartos/quarto4.jpeg", "/galeria/quartos/quarto135.jpeg",

      "/galeria/quartos/quarto48.jpeg", "/galeria/quartos/quarto5.jpeg",
      "/galeria/quartos/quarto50.jpeg",

      "/galeria/quartos/quarto6.jpeg", "/galeria/quartos/quarto7.jpeg", "/galeria/quartos/quarto8.png", "/galeria/quartos/quarto9.jpeg"
    ]
  },
  {
    id: 'salas',
    name: 'SALAS',
    cover: '/galeria/salas/sala66.png',
    description: 'Instalação de painéis de TV, racks, estantes e sofás para ambientes de estar modernos.',
    images: [
      "/galeria/salas/sala.png", "/galeria/salas/sala1.png", "/galeria/salas/sala10.png", "/galeria/salas/sala11.png",
      "/galeria/salas/sala111.png", "/galeria/salas/sala113.png", "/galeria/salas/sala117.jpeg",
      "/galeria/salas/sala12.png",
      "/galeria/salas/sala123.jpeg",
      "/galeria/salas/sala14.png",
      "/galeria/salas/sala142.jpeg", "/galeria/salas/sala143.jpeg", "/galeria/salas/sala2.png",
      "/galeria/salas/sala22.png", "/galeria/salas/sala3.jpeg", "/galeria/salas/sala5.jpeg", "/galeria/salas/sala6.jpeg",
      "/galeria/salas/sala66.png", "/galeria/salas/sala7.png"
    ]
  },
  {
    id: 'cozinhas',
    name: 'COZINHAS',
    cover: '/galeria/cozinhas/cozinha3.jpeg',
    description: 'Montagem completa de armários de cozinha, tampos, gabinetes e ferragens em geral.',
    images: [
      "/galeria/cozinhas/cozinha333.webp", "/galeria/cozinhas/cozinha342.webp", "/galeria/cozinhas/cozinha.jpg",
      "/galeria/cozinhas/cozinha.jpeg", "/galeria/cozinhas/cozinha1.jpeg", "/galeria/cozinhas/cozinha2.jpeg", "/galeria/cozinhas/cozinha21.png",
      "/galeria/cozinhas/cozinha3.jpeg", "/galeria/cozinhas/cozinha33.png", "/galeria/cozinhas/cozinha4.png",
      "/galeria/cozinhas/cozinha5.png", "/galeria/cozinhas/marcoscozinha.webp", "/galeria/cozinhas/marcosmontador.webp",
      "/galeria/cozinhas/cozinha57.jpeg"
    ]
  },
  {
    id: 'escritórios',
    name: 'ESCRITÓRIOS',
    cover: '/galeria/escritorios/escritorio.jpeg',
    description: 'Home offices, mesas e mesas de bilhar/sinuca com acabamento impecável.',
    images: [
      "/galeria/escritorios/escritorio344.webp", "/galeria/escritorios/escritorio222.webp", "/galeria/escritorios/escritorio.webp",
      "/galeria/escritorios/fundação oswaldo cruz.webp", "/galeria/escritorios/marcos montador.webp", "/galeria/escritorios/marcos.webp",
      "/galeria/escritorios/escritorio.jpeg",
      "/galeria/escritorios/escritorio14.jpeg",
      "/galeria/escritorios/escritorio16.jpeg", "/galeria/escritorios/escritorio17.jpeg",
      "/galeria/escritorios/escritorio2.jpeg", "/galeria/escritorios/escritorio20.jpeg",

      "/galeria/escritorios/escritorio28.jpeg", "/galeria/escritorios/escritorio3.jpeg",
      "/galeria/escritorios/escritorio32.jpeg", "/galeria/escritorios/escritorio4.jpeg",
      "/galeria/escritorios/escritorio8.jpeg",
      "/galeria/escritorios/escritorio9.jpeg",
    ]
  }
];



export default function CategoryGallery() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const allImages = categories.flatMap(cat => cat.images.map(img => ({ url: img, category: cat.name })));

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className="aspect-[4/5] relative overflow-hidden group rounded-2xl shadow-lg cursor-pointer"
          >
            <Image
              src={cat.cover}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                    <Image
                      src={img.url}
                      alt={`Montagem ${img.category}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
          <div
            className="absolute inset-0 bg-[var(--primary)] opacity-95 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
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
                onClick={() => setSelectedCategory(null)}
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
                    <Image
                      src={img}
                      alt={`${selectedCategory.name} - ${idx}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
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
                onClick={() => setSelectedCategory(null)}
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
            <Image
              src={expandedImage}
              alt="Imagem expandida"
              width={1200}
              height={800}
              className="object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
