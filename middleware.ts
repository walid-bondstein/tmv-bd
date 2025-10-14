import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const res = NextResponse.next();
    console.log("Current Pathname", req.nextUrl.pathname);
    res.headers.set("pathname", req.nextUrl.pathname);
    return res;
}
export const config = {
    matcher: ["/:path*"],
};