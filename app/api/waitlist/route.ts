import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Avarent <onboarding@resend.dev>",
      to: email,
      subject: "You're on the Avarent waitlist",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;color:#111;">
          <h1 style="font-size:22px;font-weight:600;margin-bottom:12px;">You're on the list.</h1>
          <p style="font-size:15px;line-height:1.6;color:#444;margin-bottom:16px;">
            We'll reach out when your pilot access is ready. In the meantime, if you have questions 
            or want to move faster, reply to this email.
          </p>
          <p style="font-size:13px;color:#888;">— George, Avarent</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
