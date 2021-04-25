import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CharacterProfile.module.css';

export function CharacterProfile() {
    const { nickname, level, currentMoney } = useContext(ChallengesContext);

    return (
        <div className={styles.characterProfileContainer}>
            <div className={styles.backgroudImg}>
                <img src="https://i.ibb.co/d4yQmk1/char1.png" alt="Personagem" />
            </div>
            <div>
                <strong>{nickname}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
                
                <p>          
                    <img src="icons/coin.svg" alt="coin" />
                    {currentMoney}
                </p>
            </div>
        </div>
    );
}