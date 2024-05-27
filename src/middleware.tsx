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
            //get the up-to-date auth store state, verifying and refreshing the loaded auth 
            pb.authStore.isValid && await pb.collection('users').authRefresh();

        } catch(err){
            //clear auth store if failed to refresh
            console.log(err,'from middleware')
            pb.authStore.clear();
        }

    }
    

}