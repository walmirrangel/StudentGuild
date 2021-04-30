import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CharacterProfile.module.css';

export function CharacterProfile() {
    const { nickname, level, currentMoney, armorEquiped, swordrEquiped, helmetEquiped, backgroundEquiped } = useContext(ChallengesContext);

    return (
        <div className={styles.characterProfileContainer}>
            <div className={styles.backgroudImg}>
                <img className={styles.backgroudImgSRC} src={`/itemSprite/background/background${backgroundEquiped}.png`} alt="Background" />
                <img className={styles.player}src="/player/player.png" alt="Personagem" />
                <img className={styles.armor}src={`/itemSprite/armor/armor${armorEquiped}.png`} alt="Armor" />
                <img className={styles.sword}src={`/itemSprite/sword/sword${swordrEquiped}.png`}  alt="Sword" />
                <img className={styles.helmet}src={`/itemSprite/helmet/helmet${helmetEquiped}.png`}  alt="Helmet" />
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