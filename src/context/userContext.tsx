import {createContext, useState} from 'react';


interface UserInfoType {
    username: string;
    password: string;
    email: string;
    [key: string]: string;
}

interface UserContextType {
    userInfo: UserInfoType;
    isLogin: Boolean;
    isRegister: Boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserInfo:UserInfoType = {
    username: "",
    password: "",
    email: "",
}

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userInfo, setUserInfo] = useState<UserInfoType>(UserInfo)
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
        <UserContext.Provider value={{userInfo, isLogin, isRegister, handleChange}}>
            {children}
        </UserContext.Provider>
    )

}

