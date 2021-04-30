import styles  from '../styles/components/Leaderboard.module.css'
import axios from 'axios'
import { useState } from 'react'

let count =0;

var atualizar = false;
export default function LeaderBoard() {
    const [users, setUsers] = useState([])


    const handleClick = () => {
        atualizar = true;
        count =0;
        axios
          .get(`/api/users/`)
          .then((response) => {
            setUsers(response.data.users);
            console.log(response.data.users)
          })
    }

    return (
        <div className={styles.container}>
            <div>
                    <h1>Ranking de jogadores</h1>
                    <button onClick={handleClick}>Buscar ranking</button>
                    <div className={styles.titulos}>
                        <p>Posição</p>
                        <p>Nome</p>
                        <p>Questões corretas</p>
                        <p>Level</p>
                    </div>
                    {atualizar?(
                    <div >{users.map((value)=>(
                    <div className={styles.posicao}>
                        <a className={styles.aPosicao}> {count=count+1}</a>
                        <a>{value.nickname}</a>
                        <a>{value.challengesCompleted}</a>
                        <a>{value.level}</a> 
                    </div>
                    
                    ))} 
                    </div>
                    
                    ):(<div>
                        <h1>Clique no botão para buscar o ranking.</h1>
                    </div>)}
            </div>
        </div>
    )
}
