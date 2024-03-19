import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import pb from "../lib/pocketbase";

export async function middleware(request: NextRequest) {
    console.log('running middleware')
    console.log(`middleware: ${request}`);
    const response = NextResponse.next();
    const requestCookie = request.cookies.get("pb_auth");
    
    if (requestCookie) {
        const userCookie = JSON.parse(requestCookie.value);
        const { token, username } = userCookie;
        const profileUrl = new URL(`/profile/${username}`, request.url);

        try{
            pb.authStore.isValid && (
                await pb.collection("user").authRefresh()
                //this ensures the user is actually logged in
            ) 
        } catch (err){
            // clear auth store on failed refresh
            pb.authStore.clear();
        } 
        
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