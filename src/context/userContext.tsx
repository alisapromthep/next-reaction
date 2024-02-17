import {createContext, useState} from 'react';

interface UserInfoType {
    name: string;
    username: string;
    password: string;
    email: string;
}

interface UserContextType {
    userInfo: UserInfoType;
    isLogin: Boolean;
    isRegister: Boolean;    
}


const UserInfo:UserInfoType = {
    name: "",
    username: "",
    password: "",
    email: "",
}

const UserContext = createContext<UserContextType>({
    userInfo: UserInfo,
    isLogin: false,
    isRegister: false
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userInfo, setUserInfo] = useState<UserInfoType>(UserInfo)
    const [isLogin, setIsLogin] = useState<Boolean>(false)
    const [isRegister, setIsRegister] = useState<Boolean>(false)

    //sign up user 

    

    return (
        <UserContext.Provider value={{userInfo, isLogin, isRegister}}>
            {children}
        </UserContext.Provider>
    )

}

