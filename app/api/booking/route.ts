import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware";
import { Booking } from "@prisma/client";
import { generateSixDigitCode } from "@/utils/helper";


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
        const { bookingCount, totalPrice, eventId, promotion } = await req.json() as Booking & { promotion?: string };

        // Validate required fields
        if (!bookingCount || !totalPrice || !eventId) {
            return NextResponse.json({ message: "Bad request: Missing required fields" }, { status: 400 });
        }

        // Use a transaction for atomic operations
        const result = await db.$transaction(async (tx) => {
            // Create the booking
            const booking = await tx.booking.create({
                data: {
                    userId,
                    eventId,
                    bookingCount,
                    totalPrice,
                    orderNo: generateSixDigitCode(),
                },
            });

            // Update event slots
            await tx.event.update({
                where: { id: eventId },
                data: {
                    leftSlot: { decrement: bookingCount },
                },
            });

            // Handle promotion if provided
            if (promotion) {
                const promo = await tx.promotion.findUnique({ where: { id: promotion } });

                if (promo && promo.promotionType === "ITEM") {
                    await tx.eventBooking.create({
                        data: {
                            bookingId: booking.id,
                            eventId,
                            discount: promo.discount,
                            code: promo.code,
                            promotionId: promotion,
                        },
                    });
                }
            } else {
                await tx.eventBooking.create({
                    data: {
                        bookingId: booking.id,
                        eventId,
                        discount: 0,
                        code: undefined,
                        promotionId: promotion,
                    },
                });
            }

            return booking;
        });

        // Success response
        return NextResponse.json({
            message: `Booking created successfully`,
            booking: { id: result.id },
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return new NextResponse(`Internal server error: ${(error as Error).message}`, { status: 500 });
    }
}

async function updateHandler(req: Request, userId: string) {
    try {
        const { status, id } = await req.json() as Booking & { promotion?: string };
        // Use a transaction for atomic operations
        const result = await db.$transaction(async (tx) => {
            // Create the booking
            const booking = await tx.booking.update({
                where: {
                    id
                },
                data: {
                    status
                },
            });

            return booking;
        });

        // Success response
        return NextResponse.json({
            message: `Booking updated successfully`,
            booking: { id: result.id },
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return new NextResponse(`Internal server error: ${(error as Error).message}`, { status: 500 });
    }
}

async function getHandler(req: Request, userId: string) {
    try {

        const bookings = await db.booking.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                orderNo: true,
                bookingCount: true,
                events: {
                    select: {
                        id: true,
                        title: true,
                        images: true,
                        totalSlots: true,
                        startDate: true,
                        endDate: true,
                        price: true
                    },
                },
                createdAt: true,
            },
        })

        // Success response
        return NextResponse.json({
            message: `Booking fetch successfully`,
            bookings,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return new NextResponse(`Internal server error: ${(error as Error).message}`, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return authMiddleware(req, async (userId: string) => {
        return handler(req, userId);
    });
}

export async function PUT(req: NextRequest) {
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
            return NextResponse.json({ message: "Only admin can update booking" }, { status: 401 });
        }
        return updateHandler(req, userId);
    });
}

export async function GET(req: NextRequest) {
    return authMiddleware(req, async (userId: string) => {
        return getHandler(req, userId);
    });
}