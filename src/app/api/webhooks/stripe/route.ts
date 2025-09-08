import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.customer_email) {
          let stripeSubscriptionId: string | null = null;
          if (
            session.subscription &&
            typeof session.subscription === "string"
          ) {
            stripeSubscriptionId = session.subscription;
          }

          await prisma.user.update({
            where: { email: session.customer_email },
            data: {
              subscription:
                session.mode === "subscription" ? "pro" : "lifetime",
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId,
              subscribedAt: new Date(), // ✅ track start date
              cancelAt: null, // ✅ reset if they re-subscribe
              canceled: false,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        );

        if (customer && "email" in customer && customer.email) {
          await prisma.user.update({
            where: { email: customer.email },
            data: {
              subscription: "free",
              stripeSubscriptionId: null,
              canceled: false,
              cancelAt: null,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        );

        if (customer && "email" in customer && customer.email) {
          await prisma.user.update({
            where: { email: customer.email },
            data: {
              // If user scheduled cancellation, store cancelAt date
              cancelAt: subscription.cancel_at
                ? new Date(subscription.cancel_at * 1000)
                : null,
              canceled: subscription.cancel_at_period_end ?? false,
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
