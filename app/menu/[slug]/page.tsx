// app/menu/[slug]/page.tsx
import { getAllSlugs, getItemBySlug, getRelatedItems } from "@/lib/menu-data";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import CustomizationPanel from "@/components/product/CustomizationPanel";
import ProductActions from "@/components/product/ProductActions";
import NutritionCard from "@/components/product/NutritionCard";
import ARViewer from "@/components/product/ARViewer";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyCart from "@/components/product/StickyCart";
import { Suspense } from "react";

// ✅ Generate static paths for all items
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await the params promise
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedItems(item.relatedSlugs || []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Gallery & AR */}
          <div className="space-y-6">
            <ProductGallery
              images={item.gallery || [item.image]}
              name={item.name}
            />
            <Suspense
              fallback={
                <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
              }
            >
              <ARViewer item={item} />
            </Suspense>
          </div>

          {/* Right Column: Info & Customization */}
          <div className="space-y-6">
            <ProductInfo item={item} />
            <ProductActions item={item} />
            <NutritionCard nutrition={item.nutrition} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <RelatedProducts items={related} />
          </section>
        )}
      </div>

      {/* Sticky Mobile Cart */}
      <StickyCart item={item} />
    </main>
  );
}
