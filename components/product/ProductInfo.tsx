// components/product/ProductInfo.tsx
import { MenuItem } from "@/types";
import { FireFlame as Flame, Star, Clock, CheckCircle as CheckBadge } from "iconoir-react";

export default function ProductInfo({ item }: { item: MenuItem }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/40 uppercase tracking-wider">
            {item.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            {item.name}
          </h1>
        </div>
        <span className="text-2xl font-black text-primary">
          {item.price.toFixed(2)}€
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {item.halal && (
          <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
            <CheckBadge className="w-4 h-4" /> Halal
          </span>
        )}
        {item.bestseller && (
          <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
            Bestseller
          </span>
        )}
        {item.chefRecommendation && (
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full">
            Chef's Pick
          </span>
        )}
        {item.spiceLevel > 0 && (
          <span className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
            <Flame className="w-4 h-4" /> {item.spiceLevel}/3
          </span>
        )}
        {item.rating && (
          <span className="flex items-center gap-1 text-white/70">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />{" "}
            {item.rating}
          </span>
        )}
        {item.preparationTime && (
          <span className="flex items-center gap-1 text-white/50">
            <Clock className="w-4 h-4" /> {item.preparationTime} min
          </span>
        )}
      </div>
      <p className="text-white/70 leading-relaxed text-base">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {item.ingredients.map((ing) => (
          <span
            key={ing.name}
            className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/70"
          >
            {ing.name}
          </span>
        ))}
      </div>
    </div>
  );
}
