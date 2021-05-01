import React, { FormEvent, useState } from 'react'
import NotificationSystem from 'react-notification-system';
import axios from 'axios'
import styles  from '../styles/pages/Cadastro.module.css'
import { useRouter } from 'next/router';

export default function Cadastro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gamename, setGamenamee] = useState('');
    const router = useRouter();

    const notificationSystem = React.createRef<any>();

    const addNotification = event => {
      event.preventDefault();
      const notification = notificationSystem.current;
      notification.addNotification({
        title:"Parabéns!!",
        message: 'Cadastro realizado com sucesso! Volte a janela de login',
        level: 'success'
      });
    };
   
    function cleanFields(){
        setUsername('');
        setPassword('');
        setGamenamee('');
    }

    const  handleSignUp = async (event: FormEvent) =>  {
        event.preventDefault();

        if (username === '' || password ==='' || gamename ===''){
            alert('Favor Preencher todos os campos.');
        }else {
            try {
            const data = await axios.get(`/api/users/${username}`);
                if (data.data.user.username === username){
                    alert("Usuário já cadastrado!")
                }else {
                    await axios.post(`/api/users`, {
                        username: username,
                        password: password,
                        nickname: gamename,
                        })
                        addNotification(event);
                        cleanFields();
                        await router.push('/');
                }
            } catch (err) {
                console.log(err);
                alert('Não foi possivel realizar o cadastro, tente novamente mais tarde!');
            }
        }
      }
    


    return (
        <div className={styles.container}>
            <main>
                <div className={styles.containerLogin}>
                <form className={styles.form} onSubmit={handleSignUp}>
                <h3>Cadastro</h3>
                        <p>Usuário</p>
                        <input type="text" name="username" id="user-name" onChange={e => setUsername(e.target.value)} value={username} placeholder="Usuário"/>
                        <p>Senha</p>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} id="pwd" value={password} placeholder="Senha"/>
                        <p>Game Name</p>
                        <input type="text" name="gamename" id="game-name" onChange={e => setGamenamee(e.target.value)} value={gamename} placeholder="Nome do avatar" maxLength={Number(13)}/>
                        <a href="/">Volte para o Login</a>
                        
                        <button type="submit" className={styles.btnSubmit}>Cadastro</button>
                    </form>
                    <NotificationSystem ref={notificationSystem} />
                </div>    
            </main>
        </div>
    )
}