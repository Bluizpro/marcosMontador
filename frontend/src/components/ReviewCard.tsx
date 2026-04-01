import { Review } from '@/services/reviews';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex gap-1 mb-4 text-accent">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            fill={i < review.rating ? "currentColor" : "none"} 
            className={i < review.rating ? "text-accent" : "text-gray-200"}
          />
        ))}
      </div>
      <p className="text-gray-600 italic mb-6 font-body leading-relaxed">
        "{review.text}"
      </p>
      <div className="flex items-center gap-4">
        {review.profile_photo_url ? (
          <img 
            src={review.profile_photo_url} 
            alt={review.author_name} 
            className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {review.author_name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-primary font-heading">{review.author_name}</h4>
          <span className="text-xs text-gray-400 uppercase tracking-widest">{review.source} review</span>
        </div>
      </div>
      
      {review.reply_text && (
        <div className="mt-8 pt-6 border-t border-gray-50">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
            <div>
              <p className="text-[10px] text-accent uppercase tracking-widest font-bold mb-2">Resposta de Marcos Montador</p>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "{review.reply_text}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
