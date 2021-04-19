import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/StaminaBar.module.css';

export function StaminaBar(){
    const { currentStamina, maxStamina ,level } = useContext(ChallengesContext);

    const percentToBeTired= Math.round(currentStamina * 100)/ maxStamina;
    

    return(
        <header className={styles.staminaBar}>
            <span>{currentStamina}</span>
            <div>
                <div style={{ width: `${percentToBeTired}%`}} />
            </div>
            <span>{maxStamina} ST</span>
        </header>
    );
}