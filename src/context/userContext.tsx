import {createContext, useState, useContext, SetStateAction} from 'react';


interface UserInfoType {
    username: string;
    password: string;
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
}

const userInfoInitial:UserInfoType = {
    username: "",
    password: "",
    email: "",
}

export const UserContext = createContext<UserContextType>({
    userInfo: userInfoInitial,
    setUserInfo: ()=>{},
    isLogin: false,
    setIsLogin: ()=>{},
    isRegister: false, 
    setIsRegister: ()=>{},
    handleChange: ()=> {}
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
    

    //sign up user 
    

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, isLogin, setIsLogin, isRegister, setIsRegister, handleChange}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUserContext() {
    return useContext(UserContext);
}

