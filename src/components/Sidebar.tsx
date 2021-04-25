import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components/Sidebar.module.css'
import Cookies from 'js-cookie'

export function Sidebar() {
    const { activePage } = useContext(SidebarContext)
    const { goHome, goStore, goLeaderboard, Logout } = useContext(SidebarContext)

    const [ activeSidebar, setActiveSidebar ] = useState(false)
    
     useEffect(() => {
         let mounted = true
   
        Promise
            .resolve(Cookies.get('sidebar&FAB'))
            .then(resp => mounted && setActiveSidebar(resp === 'enable' ? true : false))
             .catch(err => console.log(err))
    
         return () => { mounted = false } // - Cleanup()
     }, [ activeSidebar, activePage, goHome, goStore, goLeaderboard, Logout, [] ])

    const Challenge       = activePage     === 'Challenge' ?       'activePage' : '' 
    const leaderboardPage = activePage     === 'leaderbord' ? 'activePage' : ''
    const store          = activePage     === 'store' ? 'activePage' : ''
    const LogoutPage      = activeSidebar  === true ?   'activePage' : '' 

    const imgSize = 40
    const logoLoaderImg = () => `./icons/shield.png`
    const homeLoaderImg = () => `./icons/logo-bar.png`
    const goStoreimg = () => `./icons/chest.png`
    const leaderboardLoaderImg = () => `./icons/leaderboard.png`
    const Logoutimg = () => `./icons/logout2.png`

    


    return (
        <>
        {activeSidebar &&(
        <aside className={styles.sidebarContainer}>
            <div className={styles.subContainer}>
                <div className={styles.logoContainer}>
                    <Image
                      loader={logoLoaderImg}
                      quality={100}
                      src='./icons/shield.png'
                      alt="Logo"
                      width={imgSize}
                      height={imgSize}
                    />
                </div>
                <main className={styles.mainPages}>
                    <Link href="/Challenge">
                        <button type="button" className={`${styles.btnPage} ${Challenge}`} onClick={goHome}>
                            <Image
                              loader={homeLoaderImg}
                              src='./icons/logo-bar.png'
                              alt="Desafie-se"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                    <Link href="/store">
                        <button type="button" className={`${styles.btnPage} ${store}`} onClick={goStore}>
                            <Image
                              loader={goStoreimg}
                              src='./icons/chest.png'
                              alt="Inventario e loja"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                    <Link href="/LeaderBoard">
                        <button type="button" className={`${styles.btnPage} ${leaderboardPage}`} onClick={goLeaderboard}>
                            <Image
                              loader={leaderboardLoaderImg}
                              src='./icons/leaderboard.png'
                              alt="Ranking"
                              width='45'
                              height='45'
                            />
                        </button>
                    </Link>
                </main>
                <div className={styles.LogoutContainer}>
                    <Link href="/">
                        <button type="button" className={`${styles.btnPage} ${LogoutPage}`} onClick={Logout}>
                            <Image
                              loader={Logoutimg}
                              src='./icons/logout2.png'
                              alt="Logout"
                              width='60'
                              height='70'
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
        )}
        </>
    )
}