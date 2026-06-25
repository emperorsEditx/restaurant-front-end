// components/product/RelatedProducts.tsx
'use client';

import { MenuItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function RelatedProducts({ items }: { items: MenuItem[] }) {
  return (
    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/menu/${item.slug}`}
          className="flex-shrink-0 w-48 snap-start bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition group"
        >
          <div className="relative aspect-square w-full">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-2"
              sizes="192px"
            />
          </div>
          <div className="p-3">
            <h4 className="font-bold text-sm truncate">{item.name}</h4>
            <p className="text-primary font-black text-sm">{item.price.toFixed(2)}€</p>
          </div>
        </Link>
      ))}
    </div>
  );
}