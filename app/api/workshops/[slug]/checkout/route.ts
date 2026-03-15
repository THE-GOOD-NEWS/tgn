import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";
import WorkshopAttendanceRequestModel from "@/app/modals/workshopAttendanceRequestModel";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    if (!slug) {
       return NextResponse.json(
         { success: false, message: "Missing slug" },
         { status: 400 }
       );
    }

    // Find the workshop
    const workshop = await WorkshopModel.findOne({ slug: slug });
    if (!workshop) {
      return NextResponse.json(
        { success: false, message: "Workshop not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { name, phone, email, howDidYouKnow, instapayImage, type } = body;

    if (!name || !phone || !email || !howDidYouKnow || !type || (type === "available" && !instapayImage)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the attendance request
    const newRequest = new WorkshopAttendanceRequestModel({
      workshopId: workshop._id,
      name,
      phone,
      email,
      howDidYouKnow,
      type,
      instapayImage: instapayImage || "",
      status: "pending",
    });

    await newRequest.save();

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
