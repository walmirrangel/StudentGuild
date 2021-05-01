import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'

import Link from 'next/link'
import Image from 'next/image'

import styles  from '../styles/components/FloatingActionButton.module.css'
import Cookies from 'js-cookie'

export function FloatingActionButton() {
    const { activePage, goHome, goStore, goLeaderboard, Logout } = useContext(SidebarContext)
    const [ isChecked, setIsChecked ] = useState(false)

    const [ activeFAB, setActiveFAB ] = useState(false)
    
     useEffect(() => {
         let mounted = true
   
        Promise
            .resolve(Cookies.get('sidebar&FAB'))
            .then(resp => mounted && setActiveFAB(resp === 'enable' ? true : false))
             .catch(err => console.log(err))
    
         return () => { mounted = false } // - Cleanup()
     }, [ goHome, goStore, goLeaderboard, Logout, [] ])

    const Challenge       = activePage     === 'Challenge' ?       'activePageButton' : '' 
    const leaderboardPage = activePage     === 'leaderboard' ? 'activePageButton' : ''
    const store          = activePage     === 'store' ? 'activePageButton' : ''
    const LogoutPage      = activeFAB  === true ?   'activePageButton' : ''
    
    const activeFloatActionButton = () => { isChecked ? setIsChecked(false) : setIsChecked(true) }
    const checked = isChecked ? 'FABchecked' : '' // - noFABchecked
    const enabled = isChecked ? 'FABenabled' : '' // - noFABenabled

    const imgSize = 40
    const logoLoaderImg = () => `./icons/shield.png`
    const homeLoaderImg = () => `./icons/logo-bar.png`
    const goStoreimg = () => `./icons/chest.png`
    const leaderboardLoaderImg = () => `./icons/leaderboard.png`
    const Logoutimg = () => `./icons/logout2.png`

    return (
        <>
        {activeFAB  &&(
            <>
            <div className={`${styles.floatingActionButtonContainerMenu}`}>
                        <button type="button" className={`${styles.floatingActionButtonMenu} ${checked}`} onClick={activeFloatActionButton} aria-label="Float action button menu">
                            <Image
                                loader={logoLoaderImg}
                                quality={100}
                                src='./icons/shield.png'
                                alt="Logo"
                                width={imgSize}
                                height={imgSize}
                            />
                        </button>
                    </div>
                    <div className={`${styles.floatingActionButtonContainerItens} ${enabled}`}>
                        <Link href="/Challenge">
                            <button type="button" id='FABChallenge' className={`${styles.FABChallenge} ${Challenge}`} onClick={goHome} aria-label="Desafie-se">
                                <Image
                                    loader={homeLoaderImg}
                                    src='./icons/logo-bar.png'
                                    alt="Desafie-se"
                                    width={imgSize}
                                    height={imgSize}
                                />
                            </button>
                        </Link>
                        <Link href="/Store">
                            <button type="button" id='FABstore' className={`${styles.FABleaderboard} ${store}`} onClick={goStore} aria-label="Ir para inventario/loja">
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
                            <button type="button" id='FABleaderbord' className={`${styles.FABstore} ${leaderboardPage}`} onClick={goLeaderboard} aria-label="Ir para Ranking">
                                <Image
                                    loader={leaderboardLoaderImg}
                                    src='./icons/leaderboard.png'
                                    alt="Ranking"
                                    width={imgSize}
                                    height={imgSize}
                                />
                            </button>
                        </Link>
                        <Link href="/">
                            <button type="button" id='FABLogout' className={`${styles.FABLogout} ${LogoutPage}`} onClick={Logout} aria-label="Sair">
                                <Image
                                    loader={Logoutimg}
                                    src='./icons/logout2.png'
                                    alt="Logout"
                                    width={imgSize}
                                    height={imgSize}
                                />
                            </button>
                        </Link>
                    </div>
                    </>
        )}
        </>
    )
}