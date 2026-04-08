'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { submitReview } from '@/services/reviews';

interface ReviewFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewForm({ onClose, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitReview({
        author_name: name,
        rating,
        text: comment
      });
      onSuccess();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError('Houve um erro ao enviar seu comentário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300 rounded-3xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl font-black font-heading text-primary uppercase mb-2">
          Deixe seu <span className="text-accent underline decoration-4 underline-offset-4">Depoimento</span>
        </h3>
        <p className="text-gray-500 font-body mb-8">Sua opinião é fundamental para nós!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wider">Avaliação</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={32}
                    fill={(hover || rating) >= star ? '#D4AF37' : 'none'}
                    className={(hover || rating) >= star ? 'text-accent' : 'text-gray-200'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Nome Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-accent outline-none transition-colors font-body rounded-xl"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Seu Comentário</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 focus:border-accent outline-none transition-colors font-body resize-none rounded-xl"
              placeholder="Conte como foi sua experiência..."
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-accent text-primary font-black text-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50 active:scale-95 rounded-full"
          >
            {loading ? 'ENVIANDO...' : 'PUBLICAR DEPOIMENTO'}
          </button>
        </form>
      </div>
    </div>
  );
}
