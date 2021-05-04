import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

import { LowLifeStaminaWindow } from '../components/LowLifeStaminaWindow';
import { AproveitamentoModal } from '../components/Aproveitamento';

import axios from 'axios';

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
    username:string;
    nickname: string;
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

    aproveitamento:number;
    
    armorEquiped: number;
    swordrEquiped: number;
    helmetEquiped: number;
    backgroundEquiped: number;

    levelUP: () => void;
    startNewChallenge: () => void;
    wrongAnswer: () => void;
    correctAnswer: () => void;
    closeLevelUpModal: () => void;
    endChallenge: () => void;
    closeLowLifeStaminaWindow: () => void;
    closeAproveitamento: () => void;
    equipItem: () => void;
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

let respostasCorretas = 0;
let respostasErradas = 0;

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    /* configuração dos estados das barras e itens do jogo */
    const [username, setUsername] = useState(Cookies.get("username") ?? '');
    const [nickname, setNickname] = useState('no-user');
    const [level, setLevel] = useState(1);
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

    const [loading, setLoading] = useState(true)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState (false);
    const [isLowLifeStaminaWindowOpen, setIsLowLifeStaminaWindowOpen] = useState (false);
    const [isAproveitamentoOpen, setIsAproveitamentoOpen] = useState (false);

    const [aproveitamento, setAproveitamento] = useState (0);

    /* configuração dos estados das barras e itens do jogo */

    /*character profile */
    const [armorEquiped, setArmorEquiped] = useState();
    const [swordrEquiped, setSwordEquiped] = useState();
    const [helmetEquiped, setHelmetEquiped] = useState();
    const [backgroundEquiped, setbackgroundEquiped] = useState();

    useEffect(() => {
        if (loading) {
            axios
              .get(`/api/users/${username}`)
              .then((response) => {
                setNickname(response.data.user.nickname);
                setChallengesCompleted(response.data.user.challengesCompleted || 0)
                setCurrentExperience(response.data.user.currentExperience || 0)
                setCurrentMoney(response.data.user.currentMoney || 0)
                setLevel(response.data.user.level || 1)
                setCurrentLife(response.data.user.currentLife ?? 100)
                setCurrentStamina(response.data.user.currentStamina ?? 100)
                setArmorEquiped(response.data.user.equipedArmor|| 0);
                setSwordEquiped(response.data.user.equipedSword || 0)
                setHelmetEquiped(response.data.user.equipedHelmet || 0)
                setbackgroundEquiped(response.data.user.equipedBackground || 0)
              })
              .catch((e) => {
                console.log('Erro ao buscar dados do user', e)
              })
              .finally(() => {
                setLoading(false)
              })
          }  else {
              if (nickname!= 'no-user'){
                axios.post(`/api/users/`, {
                    username,
                    level: level || 1,
                    currentExperience,
                    currentLife,
                    currentStamina,
                    currentMoney,
                    challengesCompleted,
                })
              }
            }
          }, [loading, 
            level, 
            currentExperience, 
            currentLife, 
            currentStamina, 
            currentMoney, 
            challengesCompleted,
            armorEquiped, 
            swordrEquiped, 
            helmetEquiped, 
            backgroundEquiped,
            equipItem])
    
    function equipItem(){
            setLoading(true)
    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])

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
            }, 2000)
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

    function closeAproveitamento() {
        setIsAproveitamentoOpen(false);
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
    }

    function endChallenge() {
        setActiveChallenge(null);
        var aproveitamento = Math.round((respostasCorretas * 100) / (respostasCorretas + respostasErradas));
        if (isNaN(aproveitamento)) aproveitamento = 0;
        setAproveitamento(aproveitamento);
        setIsAproveitamentoOpen(true);
        respostasErradas = 0;
        respostasCorretas = 0;
    }
    

    function wrongAnswer() {
        respostasErradas = respostasErradas + 1;
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
        respostasCorretas = respostasCorretas + 1;
        setCurrentExperience(finalExperience);
        setCurrentMoney(finalMoney);
        setCurrentStamina(currentStamina - 5);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        startNewChallenge();
    }

    return(
        <ChallengesContext.Provider 
         value ={{username,nickname,
            level, 
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
         aproveitamento, 
         armorEquiped, swordrEquiped, helmetEquiped, backgroundEquiped,
         levelUP, 
         startNewChallenge, 
         wrongAnswer, 
         correctAnswer,
         closeLevelUpModal,
         endChallenge,
         closeLowLifeStaminaWindow,
         closeAproveitamento,
         equipItem,}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            {isLowLifeStaminaWindowOpen && <LowLifeStaminaWindow />}
            {isAproveitamentoOpen && <AproveitamentoModal />}
        </ChallengesContext.Provider>
      ) 
}