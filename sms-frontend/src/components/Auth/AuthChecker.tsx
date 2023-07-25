'use client';

import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import { usePathname, useRouter } from 'next/navigation';
import APIHandlers from '@/utils/APIHandlers';
import { Suspense } from 'react'



const AuthChecker = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const router = useRouter()
    const [IsLayoutNeeded, setIsLayoutNeeded] = useState(false)
    useEffect(() => {
        const LayoutNotNeeded = ['/auth/login', 'auth/signup'].includes(pathname);
        

        if (LayoutNotNeeded == false) {

            APIHandlers.get('/api/auth/user/').then(response => {
                if (response.status == 200) {
                    setIsLayoutNeeded(true);
                }

            }).catch(error => {
                if (error) {
                    setIsLayoutNeeded(false);
                    router.push('/auth/login/')
                }

            })
        }
        else {

            setIsLayoutNeeded(true);
        }





    }, [])




    return (
        <>
            {
                IsLayoutNeeded ?
                    <Layout>
                        {children}
                    </Layout>
                    :
                    <div>
                        <React.Fragment>
                            {children}
                        </React.Fragment>
                    </div>
            }

        </>
    )
}

export default AuthChecker