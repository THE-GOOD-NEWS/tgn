import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import WorkshopModel from "@/app/modals/workshopModel";
import WorkshopAttendanceRequestModel from "@/app/modals/workshopAttendanceRequestModel";
import { sendContactMail } from "@/lib/contactMail";

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
    const { name, phone, email, howDidYouKnow, instapayImage, type, notes } = body;

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
      notes: notes || "",
    });

    await newRequest.save();

    // Send notification email to admin
    try {
      await sendContactMail({
        to: "Info@thegoodnewsms.com",
        name: "Workshop System",
        subject: `New Workshop Request: ${workshop.title} (${type === "available" ? "Booking" : "Waitlist"})`,
        body: `
          <h2 style="color: #ed217c;">New Workshop Attendance Request</h2>
          <p><strong>Workshop:</strong> ${workshop.title}</p>
          <p><strong>Type:</strong> ${type === "available" ? "Booking Request" : "Waitlist Request"}</p>
          <hr />
          <h3>Requester Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>How they knew:</strong> ${howDidYouKnow}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
          ${instapayImage ? `<p><strong>Receipt:</strong> <a href="${instapayImage}">View Image</a></p>` : ""}
        `,
        from: email,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // We don't want to fail the request if the email fails
    }

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
