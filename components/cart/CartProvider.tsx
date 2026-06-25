"use client"

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react"
import type { CartItem, CartState, Coupon, SelectedOption } from "@/types"

const STORAGE_KEY = "fw_cart_v1"

type Action =
  | { type: "INIT"; payload: CartState }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "APPLY_COUPON"; payload: Coupon | null }

function safeParse<T>(v: string | null, fallback: T): T {
  try {
    return v ? (JSON.parse(v) as T) : fallback
  } catch (e) {
    return fallback
  }
}

const defaultState: CartState = {
  items: [],
  coupon: null,
  deliveryFee: 0,
  taxRate: 0.07,
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload }
    case "ADD_ITEM": {
      const item = action.payload
      // merge if same productSlug + selectedOptions
      const isSame = (a: CartItem, b: CartItem) => {
        if (a.productSlug !== b.productSlug) return false
        const aOpts = JSON.stringify(a.selectedOptions || [])
        const bOpts = JSON.stringify(b.selectedOptions || [])
        return aOpts === bOpts && (a.notes || "") === (b.notes || "")
      }

      const existing = state.items.find((it) => isSame(it, item))
      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.id === existing.id ? { ...it, quantity: it.quantity + item.quantity } : it
          ),
        }
      }

      return { ...state, items: [...state.items, item] }
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) }
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i)),
      }
    case "CLEAR":
      return { ...state, items: [], coupon: null }
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload }
    default:
      return state
  }
}

const CartStateContext = createContext<CartState | undefined>(undefined)
const CartDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined)

export function CartProvider({ children, initialState }: { children: React.ReactNode; initialState?: Partial<CartState> }) {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, ...initialState })

  // hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = safeParse<CartState>(raw, null as any)
    if (parsed) {
      dispatch({ type: "INIT", payload: parsed })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // ignore storage errors
      console.error("Failed to persist cart:", e)
    }
  }, [state])

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export function useCart() {
  const state = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)
  if (!state || !dispatch) throw new Error("useCart must be used within CartProvider")

  const addItem = (payload: Omit<CartItem, "addedAt" | "id">) => {
    const id = payload.productSlug + "::" + Math.random().toString(36).slice(2, 9)
    const item: CartItem = { ...payload, id, addedAt: new Date().toISOString() }
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } })
  const updateQty = (id: string, quantity: number) => dispatch({ type: "UPDATE_QTY", payload: { id, quantity } })
  const clear = () => dispatch({ type: "CLEAR" })
  const applyCoupon = (c: Coupon | null) => dispatch({ type: "APPLY_COUPON", payload: c })

  const subtotal = useMemo(() => {
    return state.items.reduce((s, it) => {
      const opts = (it.selectedOptions || []).reduce((a, o) => a + o.price, 0)
      return s + (it.basePrice + opts) * it.quantity
    }, 0)
  }, [state.items])

  const discount = useMemo(() => {
    if (!state.coupon) return 0
    if (typeof state.coupon.percent === "number") return (state.coupon.percent / 100) * subtotal
    return state.coupon.amount
  }, [state.coupon, subtotal])

  const taxes = useMemo(() => subtotal * state.taxRate, [subtotal, state.taxRate])
  const total = useMemo(() => Math.max(0, subtotal + taxes + state.deliveryFee - discount), [subtotal, taxes, state.deliveryFee, discount])

  return {
    state,
    addItem,
    removeItem,
    updateQty,
    clear,
    applyCoupon,
    subtotal,
    taxes,
    discount,
    total,
  }
}

export default CartProvider
