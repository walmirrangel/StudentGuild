import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100)/ experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>{currentExperience}</span>
                <div>
                    <div style={{ width: `${percentToNextLevel}%` }} />
                </div>
            <span>{experienceToNextLevel} XP</span>
        </header>
    );
}