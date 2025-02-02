// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*"); // Or specify allowed origins
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-User-ID"
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
