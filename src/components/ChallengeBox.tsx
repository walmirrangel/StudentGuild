import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'



export function ChallengeBox() {
    const { activeChallenge, wrongAnswer, correctAnswer } = useContext(ChallengesContext);

    const handleAnswerButtonClick = (isCorrect) => {
        (isCorrect) ? correctAnswer() : wrongAnswer();
    }

    const [allAnswers, setAllAnswers] = useState({
        Resposta1: '',
        Resposta2: '',
        Resposta3: '',
        Resposta4: ''
     });

    const getValue = (e) => {
        setAllAnswers( prevValues => {
            return { ...prevValues,[e.target.name]: e.target.value}
        })
    }
    

    const handleSenAnswer = () => {
        if ((allAnswers.Resposta1 === activeChallenge.answerOptions[0].answerText)
        && (allAnswers.Resposta2 === activeChallenge.answerOptions[1].answerText)
        && (allAnswers.Resposta3 === activeChallenge.answerOptions[2].answerText)
        && (allAnswers.Resposta4 === activeChallenge.answerOptions[3].answerText)) {
            
            setAllAnswers( prevValues => {
                return { ...prevValues,Resposta1: '', Resposta2: '', Resposta3: '', Resposta4: ''}
            })
            correctAnswer();
        }else{
            setAllAnswers( prevValues => {
                return { ...prevValues,Resposta1: '', Resposta2: '', Resposta3: '', Resposta4: ''}
            })
            wrongAnswer();
        }
    }

    const mySwitchFunction = (param) => {
        switch (param) {
            case 'options':
                return ([
                    <div>
                        <main>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer
                        className={styles.footerChallengeOptions}>
                            {activeChallenge.answerOptions.map((answerOption) => (
                                <button 
                                type="button" 
                                className={styles.challengeSuccedButton} 
                                onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                                    {answerOption.answerText}
                                </button>
                            ))}
                        </footer>
                    </div>
                ]);

            case 'inputAnswer':
                return ([
                    <div className={styles.divChallengInputText}> 
                        <main>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer
                        className={styles.challengeinputText}  >
                            <input
                            className={styles.challengeinputText}  
                            type="Resposta1"
                            hidden={activeChallenge.answerOptions[0].hidden}
                            onChange={getValue}
                            name="Resposta1"
                            value={allAnswers.Resposta1}/>
                            <input 
                            className={styles.challengeinputText}  
                            type="Resposta2"
                            hidden={activeChallenge.answerOptions[1].hidden}
                            onChange={getValue}
                            name="Resposta2"
                            value={allAnswers.Resposta2}/>
                            <input 
                            className={styles.challengeinputText}  
                            type="Resposta3"
                            hidden={activeChallenge.answerOptions[2].hidden}
                            onChange={getValue}
                            name="Resposta3"
                            value={allAnswers.Resposta3}/>
                            <input 
                            className={styles.challengeinputText}  
                            type="Resposta4"
                            hidden={activeChallenge.answerOptions[3].hidden}
                            onChange={getValue}
                            name="Resposta4"
                            value={allAnswers.Resposta4}/>
                                <div>
                                    <button 
                                    type="button"  
                                    className={styles.challengeinputText} 
                                    onClick={handleSenAnswer}>
                                        Resposta
                                    </button>
                                </div>
                        </footer>
                    </div>
                ]);

                case 'images':
                return ([
                    <div>
                        <main>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer
                        className={styles.footerChallengeimg}>
                            {activeChallenge.answerOptions.map((answerOption) => (
                                <img
                                src={answerOption.answerText}
                                className={styles.imgChallenge}
                                onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                                </img>
                            ))}
                        </footer>
                    </div>
                ]);

        }
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Recompensa {activeChallenge.amount} xp / {activeChallenge.money}$</header>
                    {mySwitchFunction(activeChallenge.questionType)}
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Inicie o desafio e teste seus conhecimentos.</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Responda corretamente e avance seu nível de conhecimento.
                </p>
            </div>
            )} 
        </div>
    );
}