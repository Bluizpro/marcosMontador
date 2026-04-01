'use client';

import { useState } from 'react';
import { Review } from '@/services/reviews';
import ReviewsCarousel from './ReviewsCarousel';
import ReviewForm from './ReviewForm';

interface ReviewsSectionProps {
  initialReviews: Review[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSuccess = () => {
    setIsFormOpen(false);
    // Refresh page or update state to show newest review
    // For now, we'll just reload to keep it simple and ensure data integrity
    window.location.reload();
  };

  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary uppercase tracking-tighter">
            O que dizem <span className="text-accent">nossos clientes.</span>
          </h2>
          <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
            Confira a opinião de quem já utilizou nossos serviços via Google Maps e avaliações diretas.
          </p>
        </div>
        
        <ReviewsCarousel 
          reviews={reviews} 
          onAddReview={() => setIsFormOpen(true)} 
        />

        {isFormOpen && (
          <ReviewForm 
            onClose={() => setIsFormOpen(false)} 
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </section>
  );
}
