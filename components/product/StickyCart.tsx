// components/product/StickyCart.tsx
'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import QuantitySelector from './QuantitySelector';
import { ShoppingBag, Heart } from 'iconoir-react';
import { useCart } from '@/components/cart/CartProvider';

export default function StickyCart({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { addItem } = useStickyCart();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const total = item.price * quantity;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    try {
      addItem({
        productSlug: item.slug,
        name: item.name,
        image: item.image,
        category: item.category,
        basePrice: item.price,
        quantity,
        selectedOptions: [],
        notes: "",
      })
    } catch (e) {
      console.error('Add to cart failed', e)
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 lg:hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-black text-primary">{total.toFixed(2)}€</span>
            <QuantitySelector onChange={setQuantity} />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="px-6 py-3 bg-primary text-black font-bold rounded-xl flex items-center gap-2"
          >
            {added ? (
              <>Added ✓</>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook cart functions
function useStickyCart() {
  try {
    return useCart()
  } catch (e) {
    return { addItem: () => {}, removeItem: () => {}, state: { items: [] }, subtotal: 0 } as any
  }
}