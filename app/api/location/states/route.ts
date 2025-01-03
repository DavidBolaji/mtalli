import { states } from "@/utils/data";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
) {
  const { country } = await req.json();
  try {
    const final =
      country === "Nigeria"
        ? [
            ...states[country ?? "Nigeria"],
            { name: "Rivers", state_code: "RV" },
          ]
        : [...states[country ?? "Nigeria"]];

    return NextResponse.json({
      message: "Fetch succesfull",
      data: final.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
