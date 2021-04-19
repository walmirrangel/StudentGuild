import { createContext, useState, ReactNode, useEffect } from "react"

import Cookies from 'js-cookie'

interface SidebarContextData {
    activePage: String
    goHome: () => void
    goStore: () => void
    goLeaderboard: () => void
    Logout: () => void
}
interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [activePage, setActivePage] = useState('home') 

    function goHome() {
        setActivePage('home')
        Cookies.set('activePage', 'home')
    }
    function goStore() {
        setActivePage('settings')
        Cookies.set('activePage', 'settings')
    }
    function goLeaderboard() {
        setActivePage('leaderbord')
        Cookies.set('activePage', 'leaderbord')
    }
    function Logout() {
        setActivePage('settings')
        Cookies.set('activePage', 'settings')
    }
    
    return(
        <SidebarContext.Provider value={{
            activePage,
            goHome,
            goStore,
            goLeaderboard,
            Logout,
        }}>
            {children}
        </SidebarContext.Provider>
    )
}