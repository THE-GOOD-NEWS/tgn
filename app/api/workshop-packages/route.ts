import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopPackageModel from "@/app/modals/workshopPackageModel";

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await WorkshopPackageModel.find({}).sort({ price: 1 }).lean();
    return NextResponse.json({ success: true, data: packages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

