import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';
import type { AuthProviderInfo } from 'pocketbase';
import { useRouter} from 'next/router';
import {redirect} from 'next/navigation';

interface UserInfoType {
    [key: string]: string;
}

interface AuthContextType {
    token: string,
    currentUser: UserInfoType;
    userInfo: UserInfoType;
    isLogin: Boolean;
    setUserInfo:React.Dispatch<SetStateAction<UserInfoType>>;
    setIsLogin:React.Dispatch<SetStateAction<Boolean>>;
    isRegister: Boolean;
    setIsRegister:React.Dispatch<SetStateAction<Boolean>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: (event: FormEvent<HTMLFormElement>) => void;
    handleLogin: (event: FormEvent<HTMLFormElement>) => void;
    handleLogout: MouseEventHandler;
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
    setUserInfo: ()=>{},
    setIsLogin: ()=>{},
    isRegister: false, 
    setIsRegister: ()=>{},
    handleChange: ()=> {},
    handleRegister: ()=> {},
    handleLogin: ()=> {},
    handleLogout: ()=> {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState<UserInfoType>({});
    const [userInfo, setUserInfo] = useState<UserInfoType>(userInfoInitial);
    const [isRegister, setIsRegister] = useState<Boolean>(false);
    const [isLogin, setIsLogin] = useState<Boolean>(false);

    useEffect(()=>{
        if(pb.authStore.isValid){
            const model = pb.authStore.model;
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

    const handleRegister= (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault()
        const {username, password, passwordConfirm} = userInfo;

        const register = pb.collection('users').create({
            username,
            password,
            passwordConfirm
        }
        )

        register.then((res)=>{
            console.log(res,'result from register')

            let login = signIn(username,password);
            login.then(res => {
                console.log(res);
            })
        })
        .catch(err => {
            console.log(err,'error occurred')
        })

    }

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

        }catch(err){
            console.log(err)
        }
    }

    const handleLogin= (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault();

        const {username, password} = userInfo;
        signIn(username,password);
    }

    const handleLogout = (): void =>{
        pb.authStore.clear();
        setIsLogin(false)
    }
    

    return (
        <AuthContext.Provider value={{token, currentUser, isLogin, setIsLogin, userInfo, setUserInfo,
        isRegister, setIsRegister,
        handleChange, handleRegister, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuthContext() {
    return useContext(AuthContext);
}

