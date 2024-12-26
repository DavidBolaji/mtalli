import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "../../lib/services/user-services";

export async function getUserIdFromToken(
  req: NextRequest
): Promise<string | null> {
  // Get the pathname without query string
  const token = req.cookies.get("token")?.value;

  try {
    if (!token) {
      throw new Error("Token not found");
    }
    const verifiedToken = await verifyAuth(token);

    return verifiedToken?.id as string;
  } catch (error) {
    console.error(
      "Error extracting user ID from token:",
      (error as Error).message
    );
    return null;
  }
}

/**
 * Middleware to validate token and attach user ID to the request context.
 * @param req - The NextRequest object
 * @param next - The next handler function
 * @returns Response if unauthorized; otherwise, calls next handler.
 */
export async function authMiddleware(
  req: NextRequest,
  next: (userId: string) => Promise<NextResponse>
) {
  try {
    const userId = await getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return await next(userId);
  } catch (error) {
    console.error("Error in authMiddleware:", (error as Error).message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
