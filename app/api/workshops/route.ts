import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";

export async function GET() {
  try {
    await connectToDatabase();
    const workshops = await WorkshopModel.find({}).sort({ startDate: 1 });
    return NextResponse.json({ success: true, data: workshops });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
