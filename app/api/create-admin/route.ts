import { ConnectDB } from "@/app/config/db";
import UserModel from "@/app/modals/userModel";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();

    // Check if an admin user already exists
    const existingAdmin = await UserModel.findOne({ username: "admin" });

    if (existingAdmin) {
      return NextResponse.json(
        {
          message: "Admin user already exists",
          user: {
            username: existingAdmin.username,
            email: existingAdmin.email,
            role: existingAdmin.role,
          },
        },
        { status: 200 }
      );
    }

    // Hash the password
    const hashedPassword = await hash("admin123", 10);

    // Create the admin user
    const adminUser = await UserModel.create({
      username: "admin",
      email: "admin@admin.com", // Default as email is required
      password: hashedPassword,
      role: "admin",
      firstName: "System",
      lastName: "Admin",
      emailVerified: true,
    });

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        user: {
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
