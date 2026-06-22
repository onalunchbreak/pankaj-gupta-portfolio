import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Server-side validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (First name, Email, Message)." },
        { status: 400 }
      );
    }

    console.log("📩 Received Contact Form Submission on Server:", {
      name: `${firstName} ${lastName || ""}`.trim(),
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // In a real app, you would send an email or store it in a database here.

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been received on the server." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
