import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';


interface userLogsType {
    user_id: string;
    time_of_day: string;
    food: string[];
    symptom: string[];
    notes: string;
}

interface UserContextType {
    userLogs: userLogsType[];
    getUserLogs: ()=> void;
}

export const UserContext = createContext<UserContextType>({
    userLogs: [],
    getUserLogs: ()=>{}
})

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [userLogs, setUserLog] = useState([]);

    //fetch userLogs Data from pocketbase database
    //fetch according to user_id 


    const getUserLogs = ()=>{
        const logResult = pb.collection('entries').getList(1,50, {
            filter: `user_id = "${pb.authStore.model?.id}"`,
            headers: {
                'token': `${sessionStorage.getItem('token')}`
            }
        })

        logResult.then((res)=>{
            console.log(res)})
        .catch((err)=> console.log(err))

    };



    return(
        <UserContext.Provider value={({userLogs, getUserLogs})}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    return useContext(UserContext)
}