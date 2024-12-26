import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(req: Request, userId: string) {

    try {
        const {  } = await req.json();

        // if (!title || !status || !img || !text || !description || !categoryId) {
        //     return NextResponse.json({ message: "Bad request" }, { status: 400 });
        // }

        // const blog = await db.event.create({
        //     data: {
               
        //     },
        // });

        return NextResponse.json({
            message: `Blog created succesfully`,
            // data: blog,
        });
    } catch (error) {
        console.log("[PRODUCT_GET_SINGLE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    return authMiddleware(req, async (userId: string) => {
        const exist = await db.user.findMany({
            where: {
                AND: [
                    {
                        id: userId
                    },
                    {
                        role: "ADMIN"
                    }
                ]
            }
        })
        if (!exist) {
            return NextResponse.json({ message: "Only admin can create blog category" }, { status: 401 });
        }
        return handler(req, userId);
    });
}
