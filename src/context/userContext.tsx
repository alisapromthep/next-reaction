import {createContext, useState, useContext, SetStateAction, FormEvent} from 'react';
import pb from '../../lib/pocketbase';
import type { AuthProviderInfo } from 'pocketbase';
import { useRouter } from 'next/router';

interface UserInfoType {
    id: string;
    username: string;
    password: string;
    passwordConfirm: string;
    email: string;
    [key: string]: string;
}

interface UserContextType {
    userInfo: UserInfoType;
    setUserInfo:React.Dispatch<SetStateAction<UserInfoType>>;
    isLogin: Boolean;
    setIsLogin:React.Dispatch<SetStateAction<Boolean>>;
    isRegister: Boolean;
    setIsRegister:React.Dispatch<SetStateAction<Boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: (event: FormEvent<HTMLFormElement>) => void;
    handleLogin: (event: FormEvent<HTMLFormElement>) => void;
}

const userInfoInitial:UserInfoType = {
    id: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
}

export const UserContext = createContext<UserContextType>({
    userInfo: userInfoInitial,
    setUserInfo: ()=>{},
    isLogin: false,
    setIsLogin: ()=>{},
    isRegister: false, 
    setIsRegister: ()=>{},
    handleChange: ()=> {},
    handleRegister: ()=> {},
    handleLogin: ()=> {}
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userInfo, setUserInfo] = useState<UserInfoType>(userInfoInitial)
    const [isLogin, setIsLogin] = useState<Boolean>(false)
    const [isRegister, setIsRegister] = useState<Boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };
    

    //register user 

    async function signUp(username: string,password: string, passwordConfirm: string) {
        try {
            const result = await pb.collection('users').create({
                username,
                password,
                passwordConfirm
            }
            )
            return result;
        } catch (err){
            console.log(err)
        }
    }

    const handleRegister= (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault()
        const {username, password, passwordConfirm} = userInfo;
        console.log(username,password)
        console.log(signUp(username,password,passwordConfirm));
    }

    async function signIn (username:string, password: string){
        try {
            const result = await pb.collection('users').authWithPassword(
                username,
                password
            )

            console.log(result)

        }catch(err){
            console.log(err)
        }
    }

    const handleLogin= (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault()

    }
    

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, isLogin, setIsLogin,
        isRegister, setIsRegister,
        handleChange, handleRegister, handleLogin}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUserContext() {
    return useContext(UserContext);
}

