"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams?.get("orderId") || "N/A"

  return (
    <main className="min-h-screen bg-black text-white pt-[96px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/20">
          <div className="mb-8 space-y-4">
            <p className="text-sm uppercase tracking-[.35em] text-primary">Order placed</p>
            <h1 className="text-4xl font-black">Thank you for your order!</h1>
            <p className="max-w-2xl text-white/70">We’ve received your request and are preparing it now. We’ll notify you once your order is ready.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-background/80 p-6">
              <p className="text-sm uppercase tracking-[.3em] text-white/50">Order number</p>
              <p className="mt-3 text-2xl font-semibold">{orderId}</p>
            </div>
            <div className="rounded-3xl bg-background/80 p-6">
              <p className="text-sm uppercase tracking-[.3em] text-white/50">Next step</p>
              <ul className="mt-3 space-y-2 text-white/70 list-disc list-inside">
                <li>We’ll confirm your pickup time or delivery window shortly.</li>
                <li>Keep your phone available for order updates.</li>
                <li>Want to order more? Browse our menu again.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/" className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-center font-bold text-black transition hover:bg-primary/90">
              Back to home
            </Link>
            <Link href="/menu" className="inline-flex items-center justify-center rounded-3xl border border-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10">
              Browse menu
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
