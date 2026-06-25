import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import type { OrderRequest, OrderResponse } from "@/types"

const cartItemSchema = z.object({
  id: z.string(),
  productSlug: z.string(),
  name: z.string(),
  image: z.string().optional(),
  category: z.enum(["beef", "chicken", "veggie", "drink"]),
  basePrice: z.number().nonnegative(),
  quantity: z.number().int().min(1),
  selectedOptions: z.array(z.object({ name: z.string(), price: z.number() })).optional(),
  notes: z.string().optional(),
  addedAt: z.string(),
})

const orderSchema = z
  .object({
    customerName: z.string().min(1),
    phone: z.string().min(6),
    email: z.string().email().optional(),
    deliveryMethod: z.enum(["delivery", "pickup"]),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    paymentMethod: z.enum(["cash", "card", "apple_pay", "google_pay"]),
    notes: z.string().optional(),
    cart: z.array(cartItemSchema).min(1),
    subtotal: z.number().nonnegative(),
    taxes: z.number().nonnegative(),
    deliveryFee: z.number().nonnegative(),
    discount: z.number().nonnegative(),
    total: z.number().nonnegative(),
  })
  .refine(
    (data) => data.deliveryMethod === "pickup" || (data.address && data.city && data.postalCode),
    {
      message: "Delivery orders require address, city, and postal code.",
      path: ["address"],
    }
  )

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null)
  const parsed = orderSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Order payload invalid.", details: parsed.error.format() },
      { status: 400 }
    )
  }

  const order = parsed.data as OrderRequest
  const orderId = typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `fw-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

  console.log("New order received:", { orderId, ...order })

  const response: OrderResponse = {
    orderId,
    status: "created",
    message: "Your order has been accepted and is being prepared.",
  }

  return NextResponse.json(response, { status: 201 })
}
