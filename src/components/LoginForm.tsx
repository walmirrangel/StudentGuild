import { LoginContext } from '../contexts/LoginContext'

import { FormEvent, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import styles  from '../styles/components/LoginForm.module.css'

export function LoginForm() {
    const { verifyUser } = useContext(LoginContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    var cadastrado = false;

    const  handleSubmit = async (event: FormEvent) =>  {
        event.preventDefault();
         if (username === '' || password ===''){
             alert('Favor Preencher todos os campos.');
         }else {
            try {
                const data = await axios.get(`/api/users/${username}`);
                if (data.data.user.username === username && data.data.user.password === password){
                    cadastrado = true;
                }
            } catch (err) {
                alert('Não foi possivel realizar o login, tente novamente mais tarde!');
            } finally {
                if(!cadastrado) alert("Usuário não cadastrado!!")
                if(cadastrado) verifyUser();
            }
        }
    }

    useEffect(() => {
          Cookies.set('username', String(username))
        }, [verifyUser])

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <p>Usuário</p>
            <input type="text" name="username" id="user-name" onChange={e => setUsername(e.target.value)} value={username} placeholder="Usuário"/>
            <p>Senha</p>
            <input type="password" name="password" id="pwd" onChange={e => setPassword(e.target.value)} value={password} placeholder="Senha"/>
            <a type="hyperlink" href="/Cadastro">Cadastre-se</a>
            <button type="submit" className={styles.btnSubmit}>Entrar</button>
        </form>
    )
}
