// UserContext.tsx

'use client'

import { UserInfo } from '@/authentication/authTypes';
import { BranchView, MenusModel } from '@/core/coreTypes';
import { ReactNode, createContext, useState } from 'react';

interface AuthContextProps {
    usermeta: UserInfo | null,
    branchmeta: BranchView | null,
    is_authenticated: boolean, 
    setUser: (usermeta: UserInfo | null) => void,
    setBranch: (branchmeta: BranchView | null) => void
    setAuthenticated: (authstatus: boolean ) => void, 
    today_date: any,
    setTodayDateAd: any, 
    setTodayDateNP: any, 
    menusmeta: MenusModel[] | null, 
    setMenuMeta: (menusmeta: MenusModel[] | null) => void

    
}




const AuthContext = createContext<AuthContextProps>({
    branchmeta: null,
    setBranch: () => { },
    usermeta: null,
    setUser: () => { }, 
    is_authenticated: false, 
    setAuthenticated: () => {}, 
    today_date: null, 
    setTodayDateAd: ()=>{},
    setTodayDateNP: ()=>{},
    menusmeta:  null, 
    setMenuMeta: () => {}

});



const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [usermeta, setUsermeta] = useState<UserInfo | null>(null);
    const [menusmeta, setMenusmeta] = useState<MenusModel[] | null>(null)
    const [branchmeta, setBranchmeta] = useState<BranchView | null>(null);
    const [Authenticated, setAuthenticated] = useState<boolean>(false);
    const [TodayDate, setTodayDate] = useState({
        today_date_ad: '', 
        today_date_np: ''
    })


    const setUser = (newUserDetails: UserInfo | null) => setUsermeta(newUserDetails)
    const setBranch = (newBranchDetails: BranchView | null) => setBranchmeta(newBranchDetails)
    const setAuthenticationStatus = (newAuthStatus: boolean) => setAuthenticated(newAuthStatus)
    const setTodayDateAd  =  (date: string)=>setTodayDate((preval)=>{
        return {...preval, today_date_ad: date}
    })

    const setMenus =  (newMenuMeta: MenusModel[] | null) => setMenusmeta(newMenuMeta)

    const setTodayDateNP  =  (date: string)=>setTodayDate((preval)=>{
        return {...preval, today_date_np: date}
    })
    const context_value: AuthContextProps = {
        usermeta: usermeta,
        branchmeta: branchmeta,
        setUser: setUser,
        setBranch: setBranch, 
        is_authenticated: Authenticated, 
        setAuthenticated: setAuthenticationStatus, 
        today_date : TodayDate, 
        setTodayDateAd: setTodayDateAd, 
        setTodayDateNP: setTodayDateNP, 
        menusmeta:  menusmeta, 
        setMenuMeta:  setMenus
    }


    return (
        <AuthContext.Provider value={context_value}>
            {children}
        </AuthContext.Provider>
    )


};

export { AuthContextProvider, AuthContext };
