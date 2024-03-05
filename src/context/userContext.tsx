import {createContext, useState, useEffect, useContext, SetStateAction, FormEvent, MouseEventHandler} from 'react';
import pb from '../../lib/pocketbase';

interface UserContextType {

}

export const UserContext = createContext<UserContextType>({

})

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {


    return(
        <UserContext.Provider value={({})}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    return useContext(UserContext)
}