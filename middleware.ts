import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token dari middleware:", token);

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    // Verifikasi token dengan jose (bukan jsonwebtoken)
    await jwtVerify(token, SECRET_KEY);
    console.log("Token valid");
  } catch (error) {
    console.error("Token invalid atau expired:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
