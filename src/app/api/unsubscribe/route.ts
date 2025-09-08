import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 400 }
      );
    }

    // 1. Ask Stripe to cancel at end of current billing period
    const subscription = await stripe.subscriptions.update(
      user.stripeSubscriptionId,
      { cancel_at_period_end: true }
    );

    // 2. Immediately reflect this in DB so your UI shows it
    const cancelAt = subscription.cancel_at
      ? new Date(subscription.cancel_at * 1000)
      : null;

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        canceled: true,
        cancelAt,
      },
    });

    // 3. Respond to client
    return NextResponse.json({
      success: true,
      message:
        "Your subscription will remain active until the end of the billing period.",
      cancelAt,
    });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
