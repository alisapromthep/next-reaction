"use server"

import { revalidatePath } from "next/cache";
import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';


export async function handleRegister(formData: FormData){

    const newUser = {
        username:formData.get("username")?.toString(),
        password: formData.get("password")?.toString(),
        passwordConfirm: formData.get("confirmPassword")?.toString()
    }
    console.log(newUser)
    
    if(newUser.password === newUser.passwordConfirm){
        try{
            const register = await pb.collection('users').create(
                newUser
            )
            
            if(!register?.token){
                console.log(register)
                return false;
            }
            document.cookie = pb.authStore.exportToCookie({httpOnly: false})
            console.log(register,
                "completed register")
            return true;
            
    
        }catch (err){
            console.log(err)
            console.log('error occured')
            return false;
        }

    }
}

export async function handleLogin(data: FormData){

    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if( typeof username !== 'string' || typeof password !== 'string'){
        console.error('username or password is not a string');
        return;
    }
    
    try{
        const loginResult = await pb.collection('users').authWithPassword( username, password);
        if(!loginResult?.token){
            console.log('err', loginResult)
            return false;
        }
        document.cookie = pb.authStore.exportToCookie({httpOnly: false})
        
        return true;

    } catch(err){
        console.log(err)
        return false;
    }


}
