import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/app/config/db";
import FormSubmissionModel from "@/app/modals/formSubmissionModel";
import { connectToDatabase } from "@/utils/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Ensure DB connection
    try {
        await ConnectDB();
    } catch (e) {
        console.warn("ConnectDB failed, trying connectToDatabase", e);
        await connectToDatabase();
    }

    const body = await req.json();
    const { formType, ...data } = body;

    if (!formType) {
      return NextResponse.json(
        { error: "formType is required" },
        { status: 400 }
      );
    }

    // Basic validation based on formType could be added here
    // For now, we trust the frontend validation + mongoose schema
    if (formType === "share_news") {
      if (
        !data.mediaUrls ||
        !Array.isArray(data.mediaUrls) ||
        data.mediaUrls.length === 0
      ) {
        return NextResponse.json(
          { error: "At least one file is required for share_news" },
          { status: 400 }
        );
      }
    }

    const submission = await FormSubmissionModel.create({
      formType,
      ...data,
    });

    return NextResponse.json(
      { success: true, message: "Form submitted successfully", id: submission._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: error.message },
      { status: 500 }
    );
  }
}
