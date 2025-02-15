import { NextResponse } from "next/server";
import * as cookie from "cookie"; 

export function middleware(request) {
  const rawCookies = request.headers.get("cookie") || "";
  const cookies = rawCookies
    .split(";")
    .reduce((acc, cookieStr) => {
      const [key, value] = cookieStr.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

  const token = cookies.token;
  const path = request.nextUrl.pathname;
  const publicPaths = ["/auth/signin", "/auth/signup", "/auth/verifyemail"];

  let role = null;
  if (token && token.split(".").length === 3) {
    try {
      const base64Decode = (str) => Buffer.from(str, "base64").toString("utf-8");
      const decoded = JSON.parse(base64Decode(token.split(".")[1]));
      role = decoded.role;
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
  }

  // Redirect logic
  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL(role ? "/admin" : "/", request.url));
  }

  if (path.startsWith("/admin") && (!token || !role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/admin/:path*"], 
};
