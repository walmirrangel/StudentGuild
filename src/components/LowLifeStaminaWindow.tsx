import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LowLifeStaminaWindow.module.css';

export function LowLifeStaminaWindow() {
    const { closeLowLifeStaminaWindow } = useContext(ChallengesContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <strong>Que pena! 😔</strong>
                <p>Você só pode continuar os desafios caso sua vida e stamina sejam maiores que 10!</p>

                <button type="button" onClick={closeLowLifeStaminaWindow}>
                    <img src="/icons/close.svg" alt="fechar modal"/>
                </button>
            </div>
        </div>
    )
}