'use client';

import {ReactNode} from 'react';
import { UserProvider } from "@/context/userContext";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({children}: ProvidersProps){
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}