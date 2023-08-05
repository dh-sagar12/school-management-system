// UserContext.tsx

'use client'

import { UserInfo } from '@/authentication/authTypes';
import { BranchView } from '@/core/coreTypes';
import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextProps {
    usermeta: UserInfo | null,
    branchmeta: BranchView | null,
    is_authenticated: boolean, 
    setUser: (usermeta: UserInfo | null) => void,
    setBranch: (branchmeta: BranchView | null) => void
    setAuthenticated: (authstatus: boolean ) => void
}




const AuthContext = createContext<AuthContextProps>({
    branchmeta: null,
    setBranch: () => { },
    usermeta: null,
    setUser: () => { }, 
    is_authenticated: false, 
    setAuthenticated: () => {}
});



const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [usermeta, setUsermeta] = useState<UserInfo | null>(null);
    const [branchmeta, setBranchmeta] = useState<BranchView | null>(null);
    const [Authenticated, setAuthenticated] = useState<boolean>(false)


    const setUser = (newUserDetails: UserInfo | null) => setUsermeta(newUserDetails)
    const setBranch = (newBranchDetails: BranchView | null) => setBranchmeta(newBranchDetails)
    const setAuthenticationStatus = (newAuthStatus: boolean) => setAuthenticated(newAuthStatus)

    const context_value: AuthContextProps = {
        usermeta: usermeta,
        branchmeta: branchmeta,
        setUser: setUser,
        setBranch: setBranch, 
        is_authenticated: Authenticated, 
        setAuthenticated: setAuthenticationStatus
    }


    return (
        <AuthContext.Provider value={context_value}>
            {children}
        </AuthContext.Provider>
    )


};

export { AuthContextProvider, AuthContext };
