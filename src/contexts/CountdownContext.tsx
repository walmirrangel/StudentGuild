import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';
import { SidebarContext } from "./SidebarContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}


interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdowntimeout: NodeJS.Timeout;

export function CountdownProvider({children}){
    const {answerChallenge, endChallenge, startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(2 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [stopCount, setStopCount] = useState(answerChallenge);
    
  const {goHome, goStore, goLeaderboard, goSobre} =useContext(SidebarContext);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setisActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdowntimeout);
        setisActive(false);
        setTime(2 * 60);
        setHasFinished(false);
        
        setStopCount(true);

        endChallenge();
    }

    useEffect(() => {
        if(isActive && time > 0) {
            if (stopCount){
                startNewChallenge();
                setStopCount(false);
            }
            countdowntimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setisActive(false);
            
            resetCountdown();
        }
    }, [isActive, time])

    useEffect(() => {
        if(isActive){
            resetCountdown();
        }
    }, [goHome, goStore, goLeaderboard, goSobre])

    return (
        <CountdownContext.Provider value={{minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown,}}>
            {children}
        </CountdownContext.Provider>
    )
}
