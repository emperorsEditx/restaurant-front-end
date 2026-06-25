"use client"

import { type FormEvent, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "./CartProvider"
import type { OrderRequest } from "@/types"

const paymentMethods = [
  { value: "cash", label: "Cash on Delivery" },
  { value: "card", label: "Card" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "google_pay", label: "Google Pay" },
] as const

export default function CheckoutForm() {
  const router = useRouter()
  const { state, subtotal, taxes, discount, total, clear } = useCart()
  const [isPending, startTransition] = useTransition()
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "apple_pay" | "google_pay">("cash")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)

  const canPlaceOrder = Boolean(
    customerName.trim() && phone.trim() && state.items.length > 0 &&
    (deliveryMethod === "pickup" || (address.trim() && city.trim() && postalCode.trim()))
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canPlaceOrder) {
      setError("Please complete your contact and delivery details.")
      return
    }

    const payload: OrderRequest = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      deliveryMethod,
      address: deliveryMethod === "delivery" ? address.trim() : undefined,
      city: deliveryMethod === "delivery" ? city.trim() : undefined,
      postalCode: deliveryMethod === "delivery" ? postalCode.trim() : undefined,
      paymentMethod,
      notes: notes.trim(),
      cart: state.items,
      subtotal,
      taxes,
      deliveryFee: state.deliveryFee,
      discount,
      total,
    }

    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const body = await response.json().catch(() => null)
          setError(body?.error || "Unable to place order. Please try again.")
          return
        }

        const data = await response.json()
        clear()
        router.push(`/order-confirmation?orderId=${encodeURIComponent(data.orderId)}`)
      } catch (err) {
        setError("Network error while placing order. Please try again.")
      }
    })
  }

  if (state.items.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
        <p className="text-lg font-semibold">Your cart is empty.</p>
        <p className="mt-2 text-sm text-white/70">Add items to your cart before checkout.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 rounded-3xl p-6">
        <div>
          <h2 className="text-2xl font-bold">Contact information</h2>
          <p className="mt-2 text-sm text-white/70">We’ll use this to confirm your order and keep you updated.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span>Name</span>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
              placeholder="John Doe"
              required
            />
          </label>
          <label className="space-y-1 text-sm">
            <span>Phone</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
              placeholder="0171 1234567"
              required
            />
          </label>
        </div>

        <label className="space-y-1 text-sm">
          <span>Email (optional)</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
            placeholder="email@example.com"
            type="email"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <fieldset className="space-y-3 rounded-3xl border border-white/10 p-4">
            <legend className="text-sm font-semibold">Delivery method</legend>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => setDeliveryMethod("delivery")}
                className="accent-primary"
              />
              Delivery
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => setDeliveryMethod("pickup")}
                className="accent-primary"
              />
              Pickup
            </label>
          </fieldset>

          <fieldset className="space-y-3 rounded-3xl border border-white/10 p-4">
            <legend className="text-sm font-semibold">Payment method</legend>
            {paymentMethods.map((method) => (
              <label key={method.value} className="flex items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={() => setPaymentMethod(method.value)}
                  className="accent-primary"
                />
                {method.label}
              </label>
            ))}
          </fieldset>
        </div>

        {deliveryMethod === "delivery" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span>Street address</span>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
                placeholder="Musterstraße 1"
                required={deliveryMethod === "delivery"}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>City</span>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
                placeholder="Ingolstadt"
                required={deliveryMethod === "delivery"}
              />
            </label>
            <label className="space-y-1 text-sm sm:col-span-2">
              <span>Postal code</span>
              <input
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
                placeholder="85049"
                required={deliveryMethod === "delivery"}
              />
            </label>
          </div>
        )}

        <label className="space-y-1 text-sm">
          <span>Order notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full min-h-[120px] rounded-3xl border border-white/10 bg-background/80 px-4 py-3 text-white outline-none focus:border-primary"
            placeholder="Any extra instructions for the kitchen..."
          />
        </label>

        {error && <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200">{error}</div>}

        <button
          type="submit"
          disabled={!canPlaceOrder || isPending}
          className="w-full rounded-3xl bg-primary px-5 py-4 text-base font-bold text-black transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Placing order..." : "Place order"}
        </button>
      </form>

      <aside className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div>
          <h2 className="text-2xl font-bold">Order summary</h2>
          <p className="mt-2 text-sm text-white/70">Review your cart before you confirm.</p>
        </div>

        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-background/80 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  {item.selectedOptions?.length ? (
                    <div className="mt-1 text-xs text-white/60">{item.selectedOptions.map((o) => o.name).join(', ')}</div>
                  ) : null}
                </div>
                <div className="font-semibold">{((item.basePrice + (item.selectedOptions || []).reduce((sum, opt) => sum + opt.price, 0)) * item.quantity).toFixed(2)}€</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/70">
                <span>{item.quantity} × {item.basePrice.toFixed(2)}€</span>
                <span>Item total</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-background/80 p-4 space-y-3 text-sm">
          <div className="flex justify-between text-white/70"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
          <div className="flex justify-between text-white/70"><span>Delivery fee</span><span>{state.deliveryFee.toFixed(2)}€</span></div>
          <div className="flex justify-between text-white/70"><span>Taxes</span><span>{taxes.toFixed(2)}€</span></div>
          <div className="flex justify-between text-white/70"><span>Discount</span><span>-{discount.toFixed(2)}€</span></div>
          <div className="flex justify-between text-lg font-bold pt-3"><span>Total</span><span>{total.toFixed(2)}€</span></div>
        </div>
      </aside>
    </div>
  )
}
