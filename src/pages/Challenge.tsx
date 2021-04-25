import Head from 'next/head'
import {GetServerSideProps} from 'next';
import { LifeBar } from "../components/LifeBar";
import { StaminaBar } from "../components/StaminaBar";
import { ExperienceBar } from "../components/ExperienceBar";
import { CharacterProfile } from '../components/CharacterProfile';
import { NumberQuestions } from '../components/NumberQuestions';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { StudyArea } from '../components/StudyArea';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useEffect, useState } from 'react';
import { LoginProvider } from '../contexts/LoginContext';
import Cookies from 'js-cookie';

interface HomeProps {
  username:string;
  nickname:string

  level: number;
  currentExperience: number;
  currentLife: number;
  currentStamina: number;
  currentMoney: number;
  challengesCompleted: number;
  showChallenge: boolean;
}

export default function Home(props: HomeProps) {
  Cookies.set('sidebar&FAB', 'enable') 

  const [ showChallenge, setShowChallenge ] = useState(false);
  const [ idStudyArea, setIdStudyArea ] = useState(null);
  
  function activeChallenge(){
    setShowChallenge(true);
  }
  
  function changeStudyArea(value){
    setIdStudyArea(value)
    console.log(idStudyArea);
    activeChallenge();
  }

  useEffect(() => {
    if (!setIdStudyArea) {
      console.log(idStudyArea);
    }
  }, [idStudyArea,setIdStudyArea]);

  return (
    <LoginProvider
    isLogged
>
    <ChallengesProvider
     
    level={props.level}
    currentExperience={props.currentExperience}
    currentLife={props.currentLife} 
    currentStamina={props.currentStamina}
    currentMoney={props.currentMoney}
    challengesCompleted={props.challengesCompleted}
    idStudyArea={idStudyArea}>
      <div className={styles.container}>
        <Head>
          <title>Início | StudentGuild</title>
        </Head>
        <div className={styles.homeContainer}>
        <CharacterProfile />
        <LifeBar />
        <StaminaBar />
        <ExperienceBar />
        <CountdownProvider>
          {showChallenge? (
            <section className={styles.homeSection} >
              <div>
                <NumberQuestions />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
            ) : (
              <StudyArea setStudyArea={changeStudyArea}/>
              )}
        </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
    </LoginProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { level, currentExperience, currentLife, currentStamina, currentMoney, challengesCompleted } = context.req.cookies;

  return {
    props: {
        __avatar_url: String("__avatar_url"),
        __username:   String("__username"),
        __isLogged:   Number(0),
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      currentLife: Number(currentLife), 
      currentStamina: Number(currentStamina),
      currentMoney: Number(currentMoney), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}