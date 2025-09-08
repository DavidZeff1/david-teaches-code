// /app/api/subscription/resume/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.stripeSubscriptionId) {
    return NextResponse.json(
      { error: "No active subscription" },
      { status: 400 }
    );
  }

  // Tell Stripe to keep subscription alive
  const subscription = await stripe.subscriptions.update(
    user.stripeSubscriptionId,
    { cancel_at_period_end: false }
  );

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      canceled: false,
      cancelAt: null,
    },
  });

  return NextResponse.json({ success: true });
}
