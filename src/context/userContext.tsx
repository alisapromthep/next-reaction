import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';
import type { AuthProviderInfo } from 'pocketbase';
import { useRouter} from 'next/router';
import {redirect} from 'next/navigation';


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
    handleLogout: MouseEventHandler;
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
    handleLogin: ()=> {},
    handleLogout: ()=> {}
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState(pb.authStore.token);
    const [model, setModel] = useState(pb.authStore.model);
    const [userInfo, setUserInfo] = useState<UserInfoType>(userInfoInitial)
    const [isLogin, setIsLogin] = useState<Boolean>(false)
    const [isRegister, setIsRegister] = useState<Boolean>(false)

    useEffect(()=>{
        return pb.authStore.onChange((token, model)=>{
            setToken(token);
            setModel(model)

        })
    }, [])

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
                setIsLogin(true)
            })
        })
        .catch(err => {
            console.log(err,'error occured')
        })

    }

    async function signIn (username:string, password: string){
        try {
            const result = await pb.collection('users').authWithPassword(
                username,
                password
            )

            console.log('result',result) 
            //result has token

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
    }
    

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, isLogin, setIsLogin,
        isRegister, setIsRegister,
        handleChange, handleRegister, handleLogin, handleLogout}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUserContext() {
    return useContext(UserContext);
}

