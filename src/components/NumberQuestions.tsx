import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/NumberQuestions.module.css';

export function NumberQuestions() {
    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.numberQuestionsContainer}>
            <span>Questões corretas</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}