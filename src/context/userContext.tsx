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
}

export const UserContext = createContext<UserContextType>({
    userLogs: []
})

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [userLogs, setUserLog] = useState([]);

    //fetch userLogs Data from pocketbase database
    //fetch according to user_id 

    // const header = {
    //     headers:{
    //         Authorization: `Bearer ${}`
    //     }
    // }

    const getUserLogs = ()=>{
        const logResult = pb.collection('entries').getList()
    }



    return(
        <UserContext.Provider value={({userLogs})}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    return useContext(UserContext)
}