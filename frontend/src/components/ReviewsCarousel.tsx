'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/services/reviews';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight, MessageSquarePlus } from 'lucide-react';

interface ReviewsCarouselProps {
  reviews: Review[];
  onAddReview: () => void;
}

export default function ReviewsCarousel({ reviews, onAddReview }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToDisplay(1);
      } else if (window.innerWidth < 1024) {
        setItemsToDisplay(2);
      } else {
        setItemsToDisplay(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(0, reviews.length - itemsToDisplay + 1);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden px-4 -mx-4">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToDisplay)}%)` }}
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="flex-shrink-0 px-4" 
              style={{ width: `${100 / itemsToDisplay}%` }}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Action Button */}
      <div className="mt-16 text-center">
        <button 
          onClick={onAddReview}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95"
        >
          <MessageSquarePlus size={20} className="text-accent" />
          DEIXAR MEU DEPOIMENTO
        </button>
      </div>

      {/* Pagination Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i ? 'w-8 bg-accent' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
