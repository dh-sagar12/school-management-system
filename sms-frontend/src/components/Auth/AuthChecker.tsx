'use client';

import React, { Suspense, useEffect, useState, createContext, useContext } from 'react'
import Layout from '../Layout';
import { usePathname, useRouter } from 'next/navigation';
import APIHandlers from '@/utils/APIHandlers';
import { AuthContext } from '@/Context/AuthContext';




const AuthChecker = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const router = useRouter()
    const [IsLayoutNeeded, setIsLayoutNeeded] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    const { setBranch, setUser, setAuthenticated } = useContext(AuthContext)


    useEffect(() => {
        const LayoutNotNeeded = ['/auth/login', '/auth/signup'].includes(pathname);

        if (LayoutNotNeeded == false) {

            APIHandlers.get('/api/auth/init/').then(response => {

                if (response?.access !== undefined) {

                    setIsLayoutNeeded(true);
                    setUser(response.user)
                    setBranch(response.branch)
                    setAuthenticated(true)
                    setisLoading(false)

                }

            }).catch(error => {

                if (error) {
                    setisLoading(true)
                    setIsLayoutNeeded(true);
                    router.push('/auth/login/')
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
            ) : IsLayoutNeeded ? (
                <Layout>
                    {children}
                </Layout>
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