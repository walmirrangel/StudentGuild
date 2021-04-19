import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LifeBar.module.css';

export function LifeBar() {
    const { currentLife } = useContext(ChallengesContext);

    const percentToDie= Math.round(currentLife * 100)/ 100;

    return (
        <header className={styles.lifeBar}>
            <span>{currentLife}</span>
            <div>
                <div style={{ width: `${percentToDie}%`}} />
            </div>
            <span>100 HP</span>
        </header>
    );
}