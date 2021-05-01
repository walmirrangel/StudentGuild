import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function AproveitamentoModal() {
    const { aproveitamento, closeAproveitamento } = useContext(ChallengesContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{aproveitamento}%</header>
                {aproveitamento <= 50 && 
                    <div>
                <strong>Você consegue mais!</strong>
                <p>Faça uma revisão e tente novamente, você consegue!</p>
                </div>}

                {(aproveitamento < 80 && aproveitamento > 50) && 
                    <div>
                <strong>Você está indo bem!</strong>
                <p>Continue se esforçando e você vai chegar no topo!</p>
                </div>}

                {(aproveitamento >= 80) && 
                    <div>
                <strong>Ótimo!</strong>
                <p>Você é o cara, só não perde a linha!</p>
                </div>}

                <button type="button" onClick={closeAproveitamento}>
                    <img src="/icons/close.svg" alt="fechar modal"/>
                </button>
            </div>
        </div>
    )
}