import { createContext, useState, ReactNode } from "react"

import Cookies from 'js-cookie'

interface SidebarContextData {
    activePage: String
    goHome: () => void
    goStore: () => void
    goLeaderboard: () => void
    goSobre: () => void
    Logout: () => void
}
interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [activePage, setActivePage] = useState(Cookies.get('activePage') ?? 'Challenge') 

    function goHome() {
        sidebarON()
        setActivePage('home')
        Cookies.set('activePage', 'home')
    }
    function goStore() {
        sidebarON()
        setActivePage('store')
        Cookies.set('activePage', 'store')
    }
    function goLeaderboard() {
        sidebarON()
        setActivePage('leaderboardPage')
        Cookies.set('activePage', 'leaderboardPage')
    }
    function goSobre() {
        sidebarON()
        setActivePage('sobrePage')
        Cookies.set('activePage', 'sobrePage')
    }
    function Logout() {
        sidebarON()
        setActivePage('LogoutPage')
        Cookies.set('activePage', 'LogoutPage')
    }

    const sidebarON  = () => Cookies.set('sidebar&FAB', 'enable')
    const sidebarOFF = () => Cookies.set('sidebar&FAB', 'disabled')

    return(
        <SidebarContext.Provider value={{
            activePage,
            goHome,
            goStore,
            goLeaderboard,
            goSobre,
            Logout,
        }}>
            {children}
        </SidebarContext.Provider>
    )
}