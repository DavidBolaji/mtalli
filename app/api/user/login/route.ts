import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/db/db";
import { generateTokens } from "@/lib/services/user-services";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      select: { password: true, id: true },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Wrong email or password" },
        { status: 404 }
      );
    }

    // Hash the password
    const passMatch = bcrypt.compare(password, existingUser.password as string);
    if (!passMatch) {
      return NextResponse.json(
        { message: "Wrong email or password" },
        { status: 404 }
      );
    }

    const { accessToken, refreshToken } = await generateTokens(
      existingUser?.id as string
    );

    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json(
      {
        message: "User Logged in successfully",
      },
      { status: 200 }
    );

    // Set access token as a cookie
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 1 hr
      path: "/",
      sameSite: "lax",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    // Set refresh token as a cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "lax",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
