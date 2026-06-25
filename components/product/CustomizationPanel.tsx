// components/product/CustomizationPanel.tsx
'use client';

import { useState, useCallback } from 'react';

interface CustomizationOptions {
  extras?: { name: string; price: number }[];
  removals?: string[];
}

export default function CustomizationPanel({ options, onChange }: { options?: CustomizationOptions; onChange?: (state: { selectedExtras: string[]; removedItems: string[] }) => void }) {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [removedItems, setRemovedItems] = useState<string[]>([]);

  if (!options || (!options.extras?.length && !options.removals?.length)) {
    return null;
  }

  const triggerChange = useCallback(
    (nextSelectedExtras: string[], nextRemovedItems: string[]) => {
      onChange?.({ selectedExtras: nextSelectedExtras, removedItems: nextRemovedItems })
    },
    [onChange]
  )

  const toggleExtra = (name: string) => {
    setSelectedExtras((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      triggerChange(next, removedItems)
      return next
    })
  };

  const toggleRemoval = (name: string) => {
    setRemovedItems((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      triggerChange(selectedExtras, next)
      return next
    })
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-bold">Customize your order</h3>

      {options.extras && options.extras.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white/60 mb-2">Add extras</h4>
          <div className="flex flex-wrap gap-2">
            {options.extras.map((extra) => (
              <button
                key={extra.name}
                onClick={() => toggleExtra(extra.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedExtras.includes(extra.name)
                    ? 'bg-primary text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {extra.name} (+{extra.price.toFixed(2)}€)
              </button>
            ))}
          </div>
        </div>
      )}

      {options.removals && options.removals.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white/60 mb-2">Remove ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {options.removals.map((item) => (
              <button
                key={item}
                onClick={() => toggleRemoval(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  removedItems.includes(item)
                    ? 'bg-red-500/30 text-red-400 border border-red-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}