import { SidebarContext }    from './SidebarContext'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
}                               from 'react'
import Router                   from 'next/router'
import Cookies                  from 'js-cookie'

interface LoginContextData {
    isLogged:boolean;
    verifyUser:   () => void
    login:        () => void
    logout:       () => void
}
interface  LoginProviderProps {
    children:     ReactNode
    isLogged: boolean;
}

export const LoginContext = createContext({} as LoginContextData)

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
    const { goHome, Logout } = useContext(SidebarContext)
    const [ isLogged, setIsLogged ] = useState(false);

    function verifyUser() {
        setIsLogged(true);
        login();
        
    }
    


    function login() { 
        
        Router.push('/Challenge')
    }
    function logout() {
        setIsLogged(false);
    }


    return (
        <LoginContext.Provider
            value={{isLogged,
                verifyUser,
                login,
                logout
            }}
        >
            { children }
        </LoginContext.Provider>
    )
}