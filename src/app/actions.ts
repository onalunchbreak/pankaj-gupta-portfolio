"use server";

export interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: number;
}

export async function sendContactEmail(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // 1. Server-side Validation
  if (!firstName || !email || !message) {
    return {
      success: false,
      error: "Missing required fields. First name, email, and message are mandatory.",
      timestamp: Date.now(),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Invalid email format. Please provide a valid email address.",
      timestamp: Date.now(),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // 2. Simulated Environment Fallback for Local Dev
  if (!apiKey) {
    console.log("📩 [SERVER WORKER] Simulated Resend API Submission:");
    console.log(`   - Name: ${firstName} ${lastName || ""}`.trim());
    console.log(`   - Email: ${email}`);
    console.log(`   - Message: "${message}"`);
    console.log("   - Hint: Define RESEND_API_KEY in .env.local to send real emails.");

    // Simulate minor processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Form processed successfully (Development Simulation Mode).",
      timestamp: Date.now(),
    };
  }

  // 3. Live Resend API Integration
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Pankaj Gupta Portfolio <onboarding@resend.dev>",
        to: "connectwithguptapankaj@gmail.com",
        reply_to: email,
        subject: `New Portfolio Message from ${firstName} ${lastName || ""}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1c1917; background-color: #fdfcf9; border: 1px solid #e7e2d8; border-radius: 8px; max-width: 600px;">
            <h2 style="font-family: serif; color: #d95d39; font-weight: normal; margin-bottom: 20px;">New Contact Submission</h2>
            <hr style="border: 0; border-top: 1px solid #e7e2d8; margin-bottom: 20px;" />
            <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #d95d39;">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f0ea; padding: 15px; border-radius: 6px; border: 1px solid #e7e2d8; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
              ${message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
            <hr style="border: 0; border-top: 1px solid #e7e2d8; margin-top: 20px; margin-bottom: 10px;" />
            <p style="font-size: 11px; color: #78716c; margin: 0;">Submitted via portfolio contact form engine at ${new Date().toISOString()}</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Resend API Server Error:", data);
      return {
        success: false,
        error: data.message || "Resend API rejected the email dispatch request.",
        timestamp: Date.now(),
      };
    }

    console.log(`📩 Contact email sent successfully via Resend API. Email ID: ${data.id}`);
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    console.error("❌ Failed connecting to Resend SMTP endpoint:", error);
    return {
      success: false,
      error: "Failed to dispatch email. Network connection issue.",
      timestamp: Date.now(),
    };
  }
}
