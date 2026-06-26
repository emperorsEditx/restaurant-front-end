// app/menu/[slug]/page.tsx
import { getAllSlugs, getItemBySlug, getRelatedItems } from "@/lib/menu-data";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import NutritionCard from "@/components/product/NutritionCard";
import ARViewer from "@/components/product/ARViewer";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyCart from "@/components/product/StickyCart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

// ✅ Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  
  if (!item) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${item.name} | The Foodie Wagon`,
    description: `${item.description} - 100% Halal certified street food in Ingolstadt.`,
    openGraph: {
      title: `${item.name} | The Foodie Wagon`,
      description: item.description,
      images: [{ url: item.image }],
    },
  };
}

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
    <>
      <Header />
      
      <main className="relative min-h-screen bg-black text-white pt-24 md:pt-32 pb-16 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/#menu"
              className="group inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider"
            >
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Menu
            </Link>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Gallery & AR */}
            <div className="space-y-6">
              <ProductGallery
                images={item.gallery || [item.image]}
                name={item.name}
              />
              
              {/* Show AR Viewer only for main food items, not drinks or dips */}
              {(item.category === "beef" || item.category === "chicken" || item.category === "veggie") && (
                <Suspense
                  fallback={
                    <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
                  }
                >
                  <ARViewer item={item} />
                </Suspense>
              )}
            </div>

            {/* Right Column: Info & Customization */}
            <div className="space-y-6">
              <ProductInfo item={item} />
              <ProductActions item={item} />
              {item.nutrition && <NutritionCard nutrition={item.nutrition} />}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-24 border-t border-white/10 pt-12 md:pt-16">
              <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">You may also like</h2>
              <RelatedProducts items={related} />
            </section>
          )}
        </div>

        {/* Sticky Mobile Cart */}
        <StickyCart item={item} />
      </main>

      <Footer />
    </>
  );
}
