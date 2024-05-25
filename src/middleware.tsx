import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import pb from '../lib/pocketbase';


export async function middleware(request: NextRequest){
    const response = NextResponse.next();
    const getCookie =  request.cookies.get('pb_auth')

    if(getCookie){
        const userCookie = JSON.parse(getCookie.value);
        const {token, model: {username}} = userCookie;

        try {
            pb.authStore.isValid && await pb.collection('users').authRefresh();

        } catch(err){
            console.log(err)
            pb.authStore.clear();
        }

    }
    

}