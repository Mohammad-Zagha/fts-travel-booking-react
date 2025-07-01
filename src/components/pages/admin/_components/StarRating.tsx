import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
        }`}
      />
    ))}
  </div>
);
