"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { MenuItem } from "@/types"
import QuantitySelector from "./QuantitySelector"
import CustomizationPanel from "./CustomizationPanel"
import { ShoppingBag } from "iconoir-react"
import { useCart } from "@/components/cart/CartProvider"

export default function ProductActions({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(1)
  const [optionsState, setOptionsState] = useState<{ selectedExtras: string[]; removedItems: string[] }>({ selectedExtras: [], removedItems: [] })
  const { addItem } = useCart()
  const router = useRouter()
  const extras = item.customizationOptions?.extras || []

  const selectedOptions = extras.filter(e => optionsState.selectedExtras.includes(e.name)).map(e => ({ name: e.name, price: e.price }))

  const unitPrice = item.price + selectedOptions.reduce((s, o) => s + o.price, 0)

  const addToCart = useCallback(() => {
    addItem({
      productSlug: item.slug,
      name: item.name,
      image: item.image,
      category: item.category,
      basePrice: item.price,
      quantity,
      selectedOptions,
      notes: optionsState.removedItems.join(', '),
    })
  }, [addItem, item, quantity, selectedOptions, optionsState])

  const handleAddClick = useCallback(() => {
    addToCart()
    try { window.dispatchEvent(new CustomEvent('open-cart')) } catch (e) {}
  }, [addToCart])

  const handleCheckout = useCallback(() => {
    addToCart()
    router.push('/checkout')
  }, [addToCart, router])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <QuantitySelector initial={1} onChange={setQuantity} />
        <div className="text-2xl font-black text-primary">{(unitPrice * quantity).toFixed(2)}€</div>
      </div>

      <CustomizationPanel options={item.customizationOptions} onChange={(s) => setOptionsState(s)} />

      <div className="flex gap-3 flex-col sm:flex-row">
        <button onClick={handleAddClick} className="flex-1 bg-primary text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Add to Cart
        </button>
        <button onClick={handleCheckout} className="w-full sm:w-40 bg-white/5 text-white py-3 rounded-xl font-semibold">Proceed to Checkout</button>
      </div>
    </div>
  )
}
