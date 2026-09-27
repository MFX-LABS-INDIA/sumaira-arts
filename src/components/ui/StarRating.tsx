import { StarIcon } from "./Icons";

/** Five stars, filled up to `rating`. Renders a text alternative and an optional review count. */
export function StarRating({ rating, count, className = "" }: { rating: number; count?: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} className={`h-3.5 w-3.5 ${i < filled ? "text-brand" : "text-light"}`} />
        ))}
      </div>
      {count !== undefined ? <span className="text-micro text-steel">({count})</span> : null}
    </div>
  );
}
