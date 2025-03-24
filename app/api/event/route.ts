import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware";
import { getEvent } from "@/actions/get-events";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(req: Request) {
  try {
    const {
      info,
      rules,
      policy,
      title,
      status,
      description,
      location,
      price,
      totalSlots,
      startDate,
      endDate,
      promotion,
      serviceFee,
      images,
    } = await req.json();

    if (
      !title ||
      !info ||
      !images ||
      !description ||
      !totalSlots ||
      !policy ||
      !rules ||
      !info ||
      !startDate ||
      !endDate ||
      !images ||
      !serviceFee ||
      !location
    ) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const event = await db.event.create({
      data: {
        title,
        description,
        price: +price,
        location,
        totalSlots: +totalSlots,
        leftSlot: +totalSlots,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        serviceFee: +serviceFee,
        policy,
        rules,
        info,
        status: status ? "ACTIVE" : "INACTIVE",
        images: {
          create: images.map((url: string) => ({ url })), // Creating related Image records
        },
      },
    });

    if (promotion) {
      const promo = await db.promotion.findUnique({
        where: {
          id: promotion ?? undefined,
        },
      });

      if (promo && promo.promotionType === "ITEM") {
        await db.promotion.create({
          data: {
            name: promo.name,
            code: promo.code,
            status: promo.status,
            promotionType: promo.promotionType,
            discount: parseInt(String(promo.discount), 10),
            startDate: promo.startDate,
            endDate: promo.endDate,
            eventId: event.id,
          },
        });
      }
    }

    const eventz = await getEvent(event.id);

    return NextResponse.json({
      message: `Event created succesfully`,
      event: eventz,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(`Internal error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  return authMiddleware(req, async (userId: string) => {
    const exist = await db.user.findMany({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            role: "ADMIN",
          },
        ],
      },
    });
    if (!exist) {
      return NextResponse.json(
        { message: "Only admin can create event" },
        { status: 401 }
      );
    }
    return handler(req);
  });
}

async function updateHandler(req: Request) {
  const {
    info,
    rules,
    policy,
    title,
    description,
    location,
    price,
    totalSlots,
    startDate,
    endDate,
    promotion,
    serviceFee,
    images,
    status,
    id,
  } = await req.json();

  if (
    !title ||
    !info ||
    !images ||
    !description ||
    !totalSlots ||
    !policy ||
    !rules ||
    !info ||
    !startDate ||
    !endDate ||
    !images ||
    !serviceFee ||
    !location
  ) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
  try {
    let eventz;
    let returnEvent;
    db.$transaction(
      async (tx) => {
        console.log("STARTED_DELETNG");
        // Delete existing images first
        await tx.image.deleteMany({
          where: {
            eventId: id,
          },
        });

        console.log("[DELETE IMAGES]");

        // Update product with new data
        eventz = await tx.event.update({
          where: {
            id,
          },
          data: {
            title,
            description,
            price: +price,
            location,
            totalSlots: +totalSlots,
            leftSlot: +totalSlots,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            serviceFee: +serviceFee,
            policy,
            rules,
            info,
            status: status ? "ACTIVE" : "INACTIVE",
            images: {
              create: images.map((url: string) => ({ url })), // Creating related Image records
            },
          },
        });

        console.log("[UPDATED_EVENT]");

        // 3. Update Promotion Logic

        if (promotion) {
          console.log("ENTERED_PROMOTION");
          const promo = await tx.promotion.findFirst({
            where: { id: promotion },
          });

          if (promo) {
            // If the promotion is an ITEM promotion (product-specific promotion)
            if (promo.promotionType === "ITEM") {
              // Check if the product already has a promotion
              const existingPromo = await tx.promotion.findFirst({
                where: { eventId: eventz.id },
              });

              // If there is an existing product promotion, update or replace it
              if (existingPromo) {
                // Optionally delete or update the existing promotion
                await tx.promotion.update({
                  where: { id: existingPromo.id },
                  data: {
                    // Update promotion details if needed
                    eventId: eventz.id, // Ensure it's linked to the correct product
                  },
                });
              } else {
                // Create a new product promotion if no promotion exists
                await tx.promotion.create({
                  data: {
                    ...promo,
                    eventId: eventz.id, // Link the promotion to the specific product
                  },
                });
              }
            }
          }
        }
        returnEvent = await getEvent(eventz.id);
      },
      { timeout: 20000 }
    );

    return NextResponse.json({
      message: "Event updated successfully",
      event: returnEvent,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return authMiddleware(req, async (userId: string) => {
    const exist = await db.user.findMany({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            role: "ADMIN",
          },
        ],
      },
    });
    if (!exist) {
      return NextResponse.json(
        { message: "Only admin can update event" },
        { status: 401 }
      );
    }
    return updateHandler(req);
  });
}
