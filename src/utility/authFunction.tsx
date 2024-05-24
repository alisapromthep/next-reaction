'use server'; 

import {redirect} from 'next/navigation';
import pb from '../../lib/pocketbase';
import {cookies} from 'next/headers';

export async function isAuthenticated(){
    const cookie = cookies().get('pb_auth');

    if(!cookie) {
        console.error(Error('Not logged in'));
        return false;
    } 

    return true;
}

export async function deleteCookie(){
    pb.authStore.clear();
    cookies().delete("pb_auth");
    return redirect('/');
}
