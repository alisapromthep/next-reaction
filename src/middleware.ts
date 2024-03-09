import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log(`middleware: ${request}`);
    const response = NextResponse.next();
    const requestCookie = request.cookies.get("pb_auth");
    
    if (requestCookie) {
        const userCookie = JSON.parse(requestCookie.value);
        const { token, username } = userCookie;
        const profileUrl = new URL(`/profile/${username}`, request.url);
        
        // Check if the current request is already targeting the profile route
        if (request.nextUrl.pathname !== profileUrl.pathname) {
            return NextResponse.redirect(profileUrl);
        }
    }

    return response;
}


export const config = {
    matcher: ["/profile/:username*"]
}