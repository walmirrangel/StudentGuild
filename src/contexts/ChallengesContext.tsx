import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

import { LowLifeStaminaWindow } from '../components/LowLifeStaminaWindow';

interface Challenge {
    type: string;
    description: string;
    answerOptions: Array<AnswerOptions>;
    amount: number;
    money: number;
    questionType:string;
}

interface AnswerOptions {
    answerText: string;
    isCorrect: boolean;
    hidden: boolean;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    currentLife: number;
    currentStamina: number;
    currentMoney: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    answerChallenge: boolean;
    maxStamina: number;
    idStudyArea: string;
    levelUP: () => void;
    startNewChallenge: () => void;
    wrongAnswer: () => void;
    correctAnswer: () => void;
    closeLevelUpModal: () => void;
    endChallenge: () => void;
    closeLowLifeStaminaWindow: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    currentLife: number;
    currentStamina: number;
    currentMoney: number;
    challengesCompleted: number;
    idStudyArea: string;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

let countdowntimeout: NodeJS.Timeout;

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    /* configuração dos estados das barras e itens do jogo */
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [currentMoney, setCurrentMoney] = useState(rest.currentMoney ?? 0);
    const [currentLife, setCurrentLife] = useState(rest.currentLife ?? 100);
    const [currentStamina, setCurrentStamina] = useState(rest.currentStamina ?? 100);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const maxStamina = Math.round(100 + (level -1) *2);

    const [activeChallenge, setActiveChallenge] = useState(null);
    /* verifica area de estudo */

    const [idStudyArea, setIdStudyArea] = useState(rest.idStudyArea ?? 'historia');
    /*verifica se foi respondido*/
    const [answerChallenge, setAnswerChallenge] = useState(true);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState (false);
    const [isLowLifeStaminaWindowOpen, setIsLowLifeStaminaWindowOpen] = useState (false);

    /* configuração dos estados das barras e itens do jogo */

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('currentLife', String(currentLife));
        Cookies.set('currentStamina', String(currentStamina));
        Cookies.set('currentMoney', String(currentMoney));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, currentLife, currentStamina, currentMoney, challengesCompleted])

    useEffect(() => {
        if(currentLife <= 0 && currentStamina <= 0){
            setCurrentLife(0);
            setCurrentStamina(0);
            setActiveChallenge(null);
        } else if (currentLife >= 100 && currentStamina >= maxStamina){
            setCurrentLife(100);
            setCurrentStamina(maxStamina);
        } 
    }, [currentLife, currentStamina, challengesCompleted])

    useEffect(() => {
        if(activeChallenge === null) {
            countdowntimeout = setTimeout(() => {
                if (currentLife < 100) setCurrentLife(currentLife + 1);
                if (currentStamina < maxStamina) setCurrentStamina(currentStamina + 1);
            }, 1000)
        }
    },[currentLife, currentStamina, activeChallenge])

    useEffect(() => {
        if(currentLife < 10 || currentStamina < 10 && activeChallenge !== null){
                setIsLowLifeStaminaWindowOpen(true);
                setActiveChallenge(null);
        }
    }, [currentLife, currentStamina])

    function levelUP() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function closeLowLifeStaminaWindow() {
        setIsLowLifeStaminaWindowOpen(false);
    }

    function startNewChallenge() {
        var randomChallengeIndex;
        do {
             randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        } while (challenges[randomChallengeIndex].type != String(rest.idStudyArea))

        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);

        /* audio */
        new Audio('/notification.mp3').play();

        /* permissao para notificação */
       /* if (Notification.permission === 'granted') {
            new Notification('Boa sorte 🙋', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }*/
    }

    function endChallenge() {
        setActiveChallenge(null);
    }

    function wrongAnswer() {
        setCurrentLife(currentLife - 10);
        setCurrentStamina(currentStamina - 10);
        setActiveChallenge(null);
        startNewChallenge();
        setAnswerChallenge(true);
    }

    function correctAnswer() {
        if (!activeChallenge) {
            return;
        }

        const { amount, money } = activeChallenge;
        let finalExperience = currentExperience + amount;
        let finalMoney = currentMoney + money;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUP();
        }

        setCurrentExperience(finalExperience);
        setCurrentMoney(finalMoney);
        setCurrentStamina(currentStamina - 5);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        startNewChallenge();
    }

    return(
        <ChallengesContext.Provider 
         value ={{level, 
         currentExperience,
         experienceToNextLevel, 
         currentLife, 
         currentStamina,
         currentMoney, 
         challengesCompleted, 
         activeChallenge,
         answerChallenge,
         maxStamina,
         idStudyArea, 
         levelUP, 
         startNewChallenge, 
         wrongAnswer, 
         correctAnswer,
         closeLevelUpModal,
         endChallenge,
         closeLowLifeStaminaWindow,}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            {isLowLifeStaminaWindowOpen && <LowLifeStaminaWindow />}
        </ChallengesContext.Provider>
      ) 
}