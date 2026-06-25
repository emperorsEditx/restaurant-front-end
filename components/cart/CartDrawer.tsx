"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCart } from "./CartProvider"
import QuantitySelector from "../product/QuantitySelector"

export default function CartDrawer() {
  const { state, subtotal, taxes, discount, total, updateQty, removeItem, clear } = useCart()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // listen for global open-cart event
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-cart', onOpen as EventListener)
    return () => window.removeEventListener('open-cart', onOpen as EventListener)
  }, [])

  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <>
      <button
        aria-expanded={open}
        aria-controls="cart-drawer"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-24 z-50 bg-primary text-black px-4 py-3 rounded-full shadow-lg transition-all duration-200"
      >
        Cart ({itemCount})
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="cart-drawer"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-background/95 backdrop-blur-md border-l border-border p-6 overflow-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => { clear(); setOpen(false) }} className="text-sm text-red-400">Clear</button>
                <button onClick={() => setOpen(false)} aria-label="Close cart">Close</button>
              </div>
            </div>

            {state.items.length === 0 ? (
              <div className="py-12 text-center text-white/70">Your cart is empty.</div>
            ) : (
              <div className="space-y-4">
                {state.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-4">
                    {it.image ? (
                      // next/image requires width/height or fill — keep simple img fallback
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-white/5 rounded-lg" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          {it.selectedOptions && it.selectedOptions.length > 0 && (
                            <div className="text-xs text-white/60">{it.selectedOptions.map(o => o.name).join(', ')}</div>
                          )}
                        </div>
                        <div className="font-bold">{((it.basePrice + (it.selectedOptions || []).reduce((a,b)=>a+b.price,0)) * it.quantity).toFixed(2)}€</div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantitySelector initial={it.quantity} onChange={(q) => updateQty(it.id, q)} />
                        <button onClick={() => removeItem(it.id)} className="text-sm text-red-400">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-white/70"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
                  <div className="flex justify-between text-sm text-white/70"><span>Taxes</span><span>{taxes.toFixed(2)}€</span></div>
                  <div className="flex justify-between text-sm text-white/70"><span>Delivery</span><span>{state.deliveryFee.toFixed(2)}€</span></div>
                  <div className="flex justify-between font-bold"><span>Total</span><span>{total.toFixed(2)}€</span></div>
                  <button
                    onClick={() => { setOpen(false); router.push('/checkout') }}
                    disabled={!itemCount}
                    className="w-full mt-4 rounded-xl py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 bg-primary text-black"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
