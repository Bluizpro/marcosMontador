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
    </div>
  );
}
