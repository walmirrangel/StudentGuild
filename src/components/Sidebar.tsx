import { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components/Sidebar.module.css'

export function Sidebar() {
    const { activePage } = useContext(SidebarContext)
    const { goHome, goStore, goLeaderboard, Logout } = useContext(SidebarContext)

    const homePage       = activePage === 'home' ?       'activePage' : '' 
    const leaderbordPage = activePage === 'leaderbord' ? 'activePage' : ''
    const LoginPage   = activePage === 'Logout' ?   'activePage' : '' 

    const imgSize = 40
    const logoLoaderImg = () => `./icons/logo-bar.png`
    const homeLoaderImg = () => `./icons/logo-bar.png`
    const goStoreimg = () => `./icons/logo-bar.png`
    const leaderboardLoaderImg = () => `./icons/logo-bar.png`
    const Logoutimg = () => `./icons/logo-bar.png`

    return (
        <aside className={styles.sidebarContainer}>
            <div className={styles.subContainer}>
                <div className={styles.logoContainer}>
                    <Image
                      loader={logoLoaderImg}
                      quality={100}
                      src='./icons/logo-bar.png'
                      alt="Logo"
                      width={imgSize}
                      height={imgSize}
                    />
                </div>
                <main className={styles.mainPages}>
                    <Link href="/">
                        <button type="button" className={`${styles.btnPage} ${homePage}`} onClick={goHome}>
                            <Image
                              loader={homeLoaderImg}
                              src='./icons/logo-bar.png'
                              alt="Entre os melhores"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                    <Link href="/store">
                        <button type="button" className={`${styles.btnPage} ${leaderbordPage}`} onClick={goStore}>
                            <Image
                              loader={goStoreimg}
                              src='./icons/logo-bar.png'
                              alt="Entre os melhores"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                    <Link href="/store">
                        <button type="button" className={`${styles.btnPage} ${leaderbordPage}`} onClick={goLeaderboard}>
                            <Image
                              loader={leaderboardLoaderImg}
                              src='./icons/logo-bar.png'
                              alt="Entre os melhores"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                </main>
                <div className={styles.LogoutContainer}>
                    <Link href="/LoginPage">
                        <button type="button" className={`${styles.btnPage} ${LoginPage}`} onClick={Logout}>
                            <Image
                              loader={Logoutimg}
                              src='./icons/logo-bar.png'
                              alt="Logout"
                              width={imgSize}
                              height={imgSize}
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}