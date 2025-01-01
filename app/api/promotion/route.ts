import db from "@/db/db";
import { isValid, parse } from "date-fns";
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
    const {
      name,
      code,
      type,
      ids,
      discount, // Ensure 'discount' is included in the request body
      startDate,
      endDate,
      startTime,
      endTime,
      status
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !code ||
      !type ||
      !ids ||
      !discount ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !status
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Function to combine date and time strings into a Date object using date-fns

    const combineDateTime = (dateStr: string, timeStr: string): Date => {
      // Define the format based on your input. Adjust if necessary.
      const dateTimeStr = `${dateStr} ${timeStr}`;
      const parsedDate = parse(dateTimeStr, "yyyy-MM-dd HH:mm", new Date());

      if (!isValid(parsedDate)) {
        throw new Error(`Invalid date or time format for ${dateTimeStr}`);
      }

      return parsedDate;
    };

    // Parse start and end DateTime
    const parsedStartDate = combineDateTime(startDate, startTime);
    const parsedEndDate = combineDateTime(endDate, endTime);
    // Prepare data for bulk creation
    console.log('HERE');
    
    const promotionData = ids.map(async (id: string) => {
      return await db.promotion.create({
        data: {
          name,
          code,
          status,
          discount: parseInt(discount, 10),
          startDate: parsedStartDate,
          endDate: parsedEndDate,
          eventId: id,
        }
      })
    });

    await Promise.all(promotionData)

    return NextResponse.json({
      message: `Promotion(s) created successfully`,
    });
  } catch (error) {
    console.error("Error creating promotion:", error);

    // Handle specific error messages if necessary
    if ((error as Error).message.includes("Invalid date")) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 400 }
      );
    }

    // Handle unique constraint violations (e.g., duplicate code)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error?.code === "P2002") { // Prisma specific error code for unique constraint
      return NextResponse.json(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        { message: `Promotion code '${error.meta?.target}' already exists.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const {
      name,
      code,
      type,
      ids,
      discount, // Ensure 'discount' is included in the request body
      startDate,
      endDate,
      startTime,
      endTime,
      status,
      promoId
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !code ||
      !type ||
      !ids ||
      !discount ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !status ||
      !promoId
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Function to combine date and time strings into a Date object using date-fns
    const combineDateTime = (dateStr: string, timeStr: string): Date => {
      // Define the format based on your input. Adjust if necessary.
      const dateTimeStr = `${dateStr} ${timeStr}`;
      const parsedDate = parse(dateTimeStr, "yyyy-MM-dd HH:mm", new Date());

      if (!isValid(parsedDate)) {
        throw new Error(`Invalid date or time format for ${dateTimeStr}`);
      }

      return parsedDate;
    };

    // Parse start and end DateTime
    const parsedStartDate = combineDateTime(startDate, startTime);
    const parsedEndDate = combineDateTime(endDate, endTime);

    const curPromo = await db.promotion.findFirst({
      where: { id: promoId },
      select: { code: true }
    })
    // Determine promotion type
    const promotionType = type.toLowerCase() === "item" ? "ITEM" : "CATEGORY";

    db.$transaction(async (tx) => {

      await tx.promotion.deleteMany({
        where: {
          code: curPromo?.code
        },
      })


      // Prepare data for bulk creationF
      const promotionData = ids.map(async (id: string) => {
        return await tx.promotion.create({
          data: {
            name,
            code,
            status,
            discount: parseInt(discount, 10),
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            eventId: id,
          }
        })
      });

      await Promise.all(promotionData)

    })


    return NextResponse.json({
      message: `Promotion(s) created successfully`,
    });
  } catch (error) {
    console.error("Error creating promotion:", error);

    // Handle specific error messages if necessary
    if ((error as Error).message.includes("Invalid date")) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 400 }
      );
    }

    // Handle unique constraint violations (e.g., duplicate code)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error?.code === "P2002") { // Prisma specific error code for unique constraint
      return NextResponse.json(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        { message: `Promotion code '${error.meta?.target}' already exists.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

