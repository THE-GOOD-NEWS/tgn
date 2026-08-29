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
    const { name, phone, email, howDidYouKnow, areaOfResidence, age, instapayImage, type, notes } = body;

    const isFree = workshop.price === 0;

    if (!name || !phone || !email || !howDidYouKnow || !areaOfResidence || !age || !type || (!isFree && type === "available" && !instapayImage)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the attendance request (defaults to pending for admin review)
    const newRequest = new WorkshopAttendanceRequestModel({
      workshopId: workshop._id,
      name,
      phone,
      email,
      howDidYouKnow,
      areaOfResidence,
      age: Number(age),
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
        subject: `New Workshop Request: ${workshop.title} (${isFree ? "Free - " : ""}${type === "available" ? "Booking" : "Waitlist"})`,
        body: `
          <h2 style="color: #ed217c;">New Workshop Attendance Request</h2>
          <p><strong>Workshop:</strong> ${workshop.title} ${isFree ? '<span style="color: green; font-weight: bold;">(FREE)</span>' : `(${workshop.price} EGP)`}</p>
          <p><strong>Type:</strong> ${type === "available" ? "Booking Request" : "Waitlist Request"}</p>
          <p><strong>Status:</strong> Pending Admin Review</p>
          <hr />
          <h3>Requester Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Area of Residence:</strong> ${areaOfResidence}</p>
          <p><strong>How they knew:</strong> ${howDidYouKnow}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
          ${!isFree && instapayImage ? `<p><strong>Receipt:</strong> <a href="${instapayImage}">View Image</a></p>` : ""}
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
