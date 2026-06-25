import CheckoutForm from "@/components/cart/CheckoutForm"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-[96px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[.3em] text-primary">Checkout</p>
          <h1 className="mt-3 text-4xl font-black">Complete your order</h1>
          <p className="mt-3 max-w-2xl text-white/70">Review your cart and submit your order for halal street-food delivery or pickup.</p>
        </div>

        <CheckoutForm />
      </div>
    </main>
  )
}
