import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await req.json();
  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  let mode: "subscription" | "payment";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID) {
    mode = "subscription";
  } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID) {
    mode = "payment";
  } else {
    return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
  }

  const sessionStripe = await stripe.checkout.sessions.create({
    mode,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
    customer_email: session.user.email,
  });

  return NextResponse.json({ url: sessionStripe.url });
}
