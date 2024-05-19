import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';
import { useAuthContext } from './authContext';
import {convertDate, convertTime} from '@/utility/dateAndTime';

interface userLogsType {
    user_id: string;
    date: string;
    time: string;
    timestamp: string;
    food: string;
    symptom: string[];
    notes: string;
    post_id: string;
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

    const {token} = useAuthContext();

    const [userLogs, setUserLog] = useState<userLogsType[]>([]);

    //fetch userLogs Data from pocketbase database
    //fetch according to user_id 

    useEffect(()=>{
        if(token){
            getUserLogs();
        }
},[token])

    const getUserLogs = ()=>{

        const logResult = pb.collection('entries').getList(1,50, {
            filter: `user_id = "${pb.authStore.model?.id}"`,
            headers: {
                'token': token
            }
        })

        logResult.then((res)=>{
            
        const allLogs = res.items.map((item:any)=> ({
            user_id: item.user_id,
            date: convertDate(item.time_of_day),
            time: convertTime(item.time_of_day),
            timestamp:item.timestamp,
            food: item.food,
            symptom: item.symptom,
            notes: item.notes,
            post_id: item.id,
        }))
            setUserLog(allLogs)
    })
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