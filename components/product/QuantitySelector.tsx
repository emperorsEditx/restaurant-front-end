// components/product/QuantitySelector.tsx
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'iconoir-react';

export default function QuantitySelector({ initial = 1, onChange }: { initial?: number; onChange?: (qty: number) => void }) {
  const [quantity, setQuantity] = useState(initial);

  const update = (delta: number) => {
    const newQty = Math.max(1, quantity + delta);
    setQuantity(newQty);
    onChange?.(newQty);
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
      <button
        onClick={() => update(-1)}
        className="p-2 rounded-full hover:bg-white/20 transition"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-bold">{quantity}</span>
      <button
        onClick={() => update(1)}
        className="p-2 rounded-full hover:bg-white/20 transition"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}