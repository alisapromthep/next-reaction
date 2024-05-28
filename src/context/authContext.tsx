
import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';
import { deleteCookie } from '@/utility/authFunction';
import { ValidFieldNames } from '@/components/FormField/types';
import {useForm} from "react-hook-form";
import {FormData, UserSchema} from "@/components/FormField/types";
import {zodResolver} from "@hookform/resolvers/zod";


interface UserInfoType {
    [key: string]: string;
}

interface AuthContextType {
    token: string,
    currentUser: UserInfoType;
    setToken: React.Dispatch<SetStateAction<string>>;
    isLogin: Boolean;
    setCurrentUser:React.Dispatch<SetStateAction<UserInfoType>>;
    setIsLogin:React.Dispatch<SetStateAction<Boolean>>;
    handleLogout: MouseEventHandler;
    showPassword: Boolean,
    setShowPassword: React.Dispatch<SetStateAction<Boolean>>;
    registerNewUser: (username:string, password:string, passwordConfirm:string)=> Promise<object>;
    signIn: (username:string, password: string)=> Promise<object>;
}

const userInfoInitial:UserInfoType = {
    id: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
}

export const AuthContext = createContext<AuthContextType>({
    token: "",
    currentUser: {},
    isLogin: false,
    setToken:()=>{},
    setIsLogin: ()=>{},
    setCurrentUser: ()=>{},
    handleLogout: ()=> {},
    showPassword: false,
    setShowPassword: ()=>{},
    registerNewUser: async()=>({}),
    signIn: async()=>({})
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState<UserInfoType>({});
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const {formState:{errors}, setError} = useForm<FormData>({
        resolver: zodResolver(UserSchema)
    });

    useEffect(()=>{

        let isAuth = document.cookie;
        if(isAuth && pb.authStore.isValid){
            setIsLogin(true);
            setToken(pb.authStore.token);
            const model = pb.authStore.model;
            setCurrentUser({
                id: model?.id,
                username: model?.username,
            })

        }

    },[])

    //register user 

    async function registerNewUser(username: string, password:string, passwordConfirm:string){
        const userInfo = {
            username, 
            password, 
            passwordConfirm
        }

        try{
            const result = await pb.collection('users').create(userInfo)
            const {errors = {}} = result.data;

            const fieldErrorMapping: Record<string, ValidFieldNames> ={
                username: "username",
                password: "password",
                passwordConfirm: "passwordConfirm"
            }
            
            //find field with errors 
            const fieldWithError = Object.keys(fieldErrorMapping).find(field => errors[field]);

            //update error date to the error fields 
            if(fieldWithError){
                setError(fieldErrorMapping[fieldWithError],{
                    type:'server',
                    message:errors[fieldWithError],
                })
            }

            console.log(result)

            const loginResult = await signIn(username,password);

            return loginResult;

        } catch(err){
            console.log(err)
            return Promise.reject(`error occurred ${err}`)
        }
    }


    async function signIn (username:string, password: string){
        try {
            const response = await pb.collection('users').authWithPassword(
                username,
                password
            )
            console.log(response)
            const {token, record: model} = response;

            //result has token
            document.cookie = pb.authStore.exportToCookie({httpOnly: false})
            setIsLogin(true)
            setToken(token);
            setCurrentUser({
                id: model?.id,
                username: model?.username,
            })
            return response;

        }catch(err){
            console.log(err)
            return Promise.reject(`error has occurred ${err}`)
        }
    }

    const handleLogout = (): void =>{
        deleteCookie();
        setIsLogin(false)
    }
    

    return (
        <AuthContext.Provider value={{token, currentUser, isLogin, setIsLogin,
        setCurrentUser, setToken,
        handleLogout,
        showPassword,setShowPassword, registerNewUser,signIn}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuthContext() {
    return useContext(AuthContext);
}

