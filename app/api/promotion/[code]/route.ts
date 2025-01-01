import db from "@/db/db";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
    req: Request,
    { params }: { params: { code: string } },
) {
    if (!params.code)
        return new NextResponse('Promotion code is required', { status: 400 })

    try {
        const promotion = await db.promotion.findFirstOrThrow({
            where: {
                code: params.code,
            }
        })
        console.log(promotion);

        return NextResponse.json(promotion)
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}
