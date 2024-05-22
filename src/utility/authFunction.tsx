"use server"

import { revalidatePath } from "next/cache";
import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';
import { useAuthContext } from "@/context/authContext";

const {setIsLogin, setToken, setCurrentUser } = useAuthContext();

const completeLogin = ()=>{
    document.cookie = pb.authStore.exportToCookie({httpOnly: false})
    const model = pb.authStore.model;
    setIsLogin(true);
    setToken(pb.authStore.token);
    setCurrentUser({
        id: model?.id,
                username: model?.username,
    })
    
}

export async function handleRegister(formData: FormData){

    const newUser = {
        username:formData.get("username"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    }
    
    if(newUser.password === newUser.confirmPassword){
        try{
            const register = await pb.collection('users').create({
                newUser
            })

            completeLogin();
            console.log(register,
                "completed register")
            
    
        }catch (err){
            console.log(err)
        }

    }
}

export async function handleLogin(formData: FormData){

    const username = formData.get("username");
    const password = formData.get("password");

    if( typeof username !== 'string' || typeof password !== 'string'){
        console.error('username or password is not a string');
        return;
    }
    
    try{
        const loginResult = await pb.collection('users').authWithPassword( username, password);

        completeLogin();

    } catch(err){
        console.log(err)
    }


}
