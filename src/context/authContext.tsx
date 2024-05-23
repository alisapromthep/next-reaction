"use client"
import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


interface UserInfoType {
    [key: string]: string;
}

interface AuthContextType {
    token: string,
    currentUser: UserInfoType;
    userInfo: UserInfoType;
    setToken: React.Dispatch<SetStateAction<string>>;
    isLogin: Boolean;
    setUserInfo:React.Dispatch<SetStateAction<UserInfoType>>;
    setCurrentUser:React.Dispatch<SetStateAction<UserInfoType>>;
    setIsLogin:React.Dispatch<SetStateAction<Boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    userInfo: userInfoInitial,
    isLogin: false,
    setToken:()=>{},
    setUserInfo: ()=>{},
    setIsLogin: ()=>{},
    setCurrentUser: ()=>{},
    handleChange: ()=> {},
    handleLogout: ()=> {},
    showPassword: false,
    setShowPassword: ()=>{},
    registerNewUser: async()=>({}),
    signIn: async()=>({})
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState<UserInfoType>({});
    const [userInfo, setUserInfo] = useState<UserInfoType>(userInfoInitial);
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    useEffect(()=>{

        if(pb.authStore.isValid && pb.authStore.model){
            const model = pb.authStore.model;
            setIsLogin(true);
            setToken(pb.authStore.token);
            setCurrentUser({
                id: model?.id,
                username: model?.username,
            })
        }
    },[])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
        
    };

    //register user 

    async function registerNewUser(username: string, password:string, passwordConfirm:string){
        const userInfo = {
            username, 
            password, 
            passwordConfirm
        }

        try{
            const result = await pb.collection('users').create(userInfo)
            console.log(result)

            const loginResult = await signIn(username,password);

            return loginResult;

        } catch(err){
            console.log(err)
            return Promise.reject(`error occurred ${err}`)
        }

        

    }

    // const handleRegister= (event: FormEvent<HTMLFormElement>): void =>{
    //     event.preventDefault()
    //     const {username, password, passwordConfirm} = userInfo;

    //     const register = pb.collection('users').create({
    //         username,
    //         password,
    //         passwordConfirm
    //     }
    //     )

    //     register.then((res)=>{
    //         console.log(res,'result from register')

    //         let login = signIn(username,password);
    //         login.then(res => {
    //             console.log(res);
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err,'error occurred')
    //     })

    // }

    async function signIn (username:string, password: string){
        try {
            const result = await pb.collection('users').authWithPassword(
                username,
                password
            )
            //result has token
            document.cookie = pb.authStore.exportToCookie({httpOnly: false})
            setIsLogin(true)
            console.log(pb.authStore.model)
            const model = pb.authStore.model;
            setToken(pb.authStore.token);
            setCurrentUser({
                id: model?.id,
                username: model?.username,
            })
            return result;

        }catch(err){
            console.log(err)
            return Promise.reject(`error has occurred ${err}`)
        }
    }

    // const handleLogin= (event: FormEvent<HTMLFormElement>): void =>{
    //     event.preventDefault();

    //     const {username, password} = userInfo;
    //     signIn(username,password);
    // }

    const handleLogout = (): void =>{
        pb.authStore.clear();
        setIsLogin(false)
    }
    

    return (
        <AuthContext.Provider value={{token, currentUser, isLogin, setIsLogin, userInfo, setUserInfo,
        setCurrentUser, setToken,
        handleChange, handleLogout,
        showPassword,setShowPassword, registerNewUser,signIn}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuthContext() {
    return useContext(AuthContext);
}

