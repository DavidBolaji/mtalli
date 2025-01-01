import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../middleware";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


async function updateHandler(userId: string, req: NextRequest) {
  try {
    const exist = await db.user.findMany({
      where: {
        AND: [
          { id: userId },
          { role: "ADMIN" },
        ],
      },
    });

    if (!exist) {
      return NextResponse.json(
        { message: "Only admin can update user" },
        { status: 401 }
      );
    }

    const { id, fname, lname, phone, pic, 
      // orderAddress 
    } = await req.json();

    // Update user details
    await db.user.update({
      where: { id: id as string },
      data: { fname, lname, phone, pic: pic ?? undefined },
    });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  return authMiddleware(req, async (userId: string) => {
    return updateHandler(userId, req);
  });
}