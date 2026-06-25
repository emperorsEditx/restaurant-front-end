// components/product/NutritionCard.tsx
'use client';

import { useState } from 'react';
import { Nutrition } from '@/types';
import { NavArrowRight } from 'iconoir-react';

export default function NutritionCard({ nutrition }: { nutrition: Nutrition }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold">Nutrition & Allergens</span>
        <NavArrowRight className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-white/40">Calories</p>
              <p className="text-lg font-bold">{nutrition.calories} kcal</p>
            </div>
            <div>
              <p className="text-xs text-white/40">Protein</p>
              <p className="text-lg font-bold">{nutrition.protein}g</p>
            </div>
            <div>
              <p className="text-xs text-white/40">Fat</p>
              <p className="text-lg font-bold">{nutrition.fat}g</p>
            </div>
            <div>
              <p className="text-xs text-white/40">Carbs</p>
              <p className="text-lg font-bold">{nutrition.carbs}g</p>
            </div>
          </div>
          {nutrition.allergens && nutrition.allergens.length > 0 && (
            <div>
              <p className="text-xs text-white/40 mb-1">Allergens</p>
              <div className="flex flex-wrap gap-2">
                {nutrition.allergens.map((a) => (
                  <span key={a} className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}