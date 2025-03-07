import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Ambil token dari cookies
  console.log("Token dari middleware222:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Middleware hanya untuk halaman dashboard, bukan semuanya
export const config = {
  matcher: ["/dashboard/:path*"], 
};
