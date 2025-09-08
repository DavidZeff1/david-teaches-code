// /app/api/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// simple helper to add months
function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.subscription !== "pro" || !user.subscribedAt) {
      return NextResponse.json(
        { error: "No active Pro subscription found" },
        { status: 400 }
      );
    }

    // Calculate end date: one month after subscribedAt
    const cancelAt = addMonths(user.subscribedAt, 1);

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        canceled: true,
        cancelAt,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Your subscription will remain active until the end of the billing period.",
      cancelAt,
    });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json(
      { error: "Failed to schedule cancellation" },
      { status: 500 }
    );
  }
}
