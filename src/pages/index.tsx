import { LoginProvider } from '../contexts/LoginContext'

import { LoginForm } from '../components/LoginForm'

import { GetServerSideProps } from 'next'

import styles  from '../styles/pages/Login.module.css'
import Cookies from 'js-cookie'

interface LoginProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export default function Login(props:LoginProps) {
    Cookies.set('sidebar&FAB', 'disable') 

    return (
        <LoginProvider
        isLogged
        >
            <div className={styles.container}>
                <main>
                    <div className={styles.containerLogin}>
                        <h3>Bem-vindo ao Student Guild</h3>
                        <div>
                            <p>Faça login para começar suas aventuras!</p>
                        </div>
                        <LoginForm />
                    </div>
                </main>
            </div>
        </LoginProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { __username, __avatar_url, __isLogged } = ctx.req.cookies

  return {
      props: {
          __avatar_url: String(__avatar_url),
          __username:   String(__username),
          __isLogged:   Number(__isLogged)
      }
  }
}