import { cities } from "@/utils/data";
import { NextResponse } from "next/server";

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
    const { state } = await req.json();

    if (!(state in cities)) {
      return NextResponse.json(
        { message: "Invalid state provided" },
        { status: 400 }
      );
    }

    // TypeScript now knows state is a key of cities
    return NextResponse.json({
      message: `${state} retrieved`,
      data: [...cities[state as keyof typeof cities]],
    });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
