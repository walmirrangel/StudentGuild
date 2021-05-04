import { LoginProvider } from '../contexts/LoginContext'

import { LoginForm } from '../components/LoginForm'

import { GetServerSideProps } from 'next'

import styles  from '../styles/pages/Login.module.css'
import Cookies from 'js-cookie'
import { useState } from 'react'

interface LoginProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export default function Login(props:LoginProps) {
    Cookies.set('sidebar&FAB', 'disable') 

    const [loginAtivo, setLoginAtivo] = useState(false);

    return (
        <LoginProvider
        isLogged
        >
            <div className={styles.container}>
                <main>
                    <div className={styles.containerLogin}>

                        <h3>Bem-vindo ao Student Guild</h3>
                        
                        {loginAtivo ? (
                        <>
                        <div>
                            <p>Faça login para começar suas aventuras!</p>
                        </div>
                        <LoginForm />
                        </>
                        ):(
                        <>
                        <div className={styles.texto}>
                            <p>Student Guild é um jogo acadêmico para estudantes do ensino médio baseado em jogos de RPG.</p>
                            <p>Nele serão apresentados desafios em formas de questões e puzzles.</p>
                            <p>Ao concluir os desafios você será premiado com experiência e dinheiro do jogo.</p>
                            <p>A experiência te colocara no rank do jogo.</p>
                            <p>com o dinheiro você poderá personalizar seu personagem com os itens da loja.</p>
                            <p>Cuidado com seus pontos de vida e stamina, pois sem eles você não poderá prosseguir com os desafios.</p>
                        </div>
                        <button onClick={() => setLoginAtivo(true)}>Iniciar aventura</button>
                        </>
                        )}
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