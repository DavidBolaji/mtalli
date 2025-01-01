import db from "@/db/db";
import { jwtVerify, SignJWT } from 'jose';

interface JWTPayload {
  id?: string
  iat?: number
  exp?: number
}


export async function verifyAuth(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log((error as Error).message)
    throw new Error("Invalid token");
  }
}

export async function generateTokens(userId: string) {
  // Encode secrets to Uint8Array format
  const accessSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!);
  const refreshSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_TWO!);

  // Generate Access Token with a 30-minute expiration
  const accessToken = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(accessSecret);

  // Generate Refresh Token with a 7-day expiration
  const refreshToken = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(refreshSecret);

  return { accessToken, refreshToken };
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email as string,
      },
      select: {
        id: true,
        fname: true,
        lname: true,
        pic: true,
        email: true,
        phone: true,
        bookings: {
          select: {
            events: {
              select: {
                title: true,
                price: true,
                images: true,
              }
            }
          },
        },
      },
    });
    return user;
  } catch (e) {
    console.log((e as Error).message);
  }
};
