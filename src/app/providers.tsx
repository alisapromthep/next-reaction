'use client';

import {ReactNode} from 'react';
import { AuthProvider } from "@/context/authContext";
import { UserProvider } from '@/context/userContext';
import { IconProvider } from '@/context/iconContext';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({children}: ProvidersProps){
    return (
        <AuthProvider>
            <UserProvider>
                <IconProvider>
                    {children}
                </IconProvider>
            </UserProvider>
        </AuthProvider>
    )
}