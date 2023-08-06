'use client';

import React, { Suspense, useEffect, useState, createContext, useContext } from 'react'
import LayOut from '../Layout/Layout';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import APIHandlers from '@/utils/APIHandlers';
import { AuthContext } from '@/Context/AuthContext';



const AuthChecker =  ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const router = useRouter()
    const [IsLayoutNeeded, setIsLayoutNeeded] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    const { setBranch, setUser, setAuthenticated, setTodayDateAd, setTodayDateNP } = useContext(AuthContext)


    useEffect(() => {
        const LayoutNotNeeded = ['/auth/login', '/auth/signup'].includes(pathname);

        if (LayoutNotNeeded == false) {

            APIHandlers.get('/api/auth/init/').then(response => {

                if (response?.access !== undefined) {

                    setIsLayoutNeeded(true);
                    setUser(response.user)
                    setBranch(response.branch)
                    setAuthenticated(true)
                    setTodayDateNP(response.today_np)
                    setTodayDateAd(response.today_ad)
                    setisLoading(false)
                    
                }

            }).catch(error => {

                if (error) {
                    setisLoading(true)
                    setIsLayoutNeeded(true);
                    router.push(`/auth/login/?ReturnUrl=${pathname}`)
                    setisLoading(false)

                }

            })
        }
        else {

            setIsLayoutNeeded(false);
            setisLoading(false)

        }

    }, [pathname])




    return (
        <>

            {isLoading ? (
                <div>Loading...</div>
            ) : 
            IsLayoutNeeded ? (
                <LayOut>
                    {children}
                </LayOut>
            ) : (
                <div>
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                </div>
            )}
        </>
    )
}

export default AuthChecker