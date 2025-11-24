import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import newSletterModel from "@/app/modals/newSletterModel";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email || "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    await connectToDatabase();

    await newSletterModel.updateOne(
      { email },
      { $setOnInsert: { email } },
      { upsert: true }
    );

    const apiKey = process.env.BREVO_NEWS_LETTERS_API_KEY;
    const listIdStr = process.env.BREVO_LIST_ID;
    const listId = listIdStr ? parseInt(listIdStr, 10) : undefined;

    let brevo = { ok: false } as { ok: boolean; status?: number; data?: any };

    if (apiKey && listId) {
      try {
        const res = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
          body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
        });

        const data = await res.json().catch(() => undefined);
        brevo = { ok: res.ok, status: res.status, data };
      } catch (e) {
        brevo = { ok: false };
      }
    }

    return NextResponse.json({ success: true, brevo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}