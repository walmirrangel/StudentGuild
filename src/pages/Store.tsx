
import axios from 'axios'
import { CharacterProfile } from '../components/CharacterProfile'
import { LifeBar } from '../components/LifeBar'
import { StaminaBar } from '../components/StaminaBar'
import { ExperienceBar } from '../components/ExperienceBar'

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { GetServerSideProps } from 'next'
import { useContext, useState } from 'react'
import { Inventory } from '../components/Inventory'
import Loja from '../components/Loja'
import styles  from '../styles/components/Store.module.css'
import armors from '../JSON/armors.json';
import { StoreProvider } from '../contexts/StoreContext'


interface HomeProps {
    level: number;
    currentExperience: number;
    currentLife: number;
    currentStamina: number;
    currentMoney: number;
    challengesCompleted:number;
  }

export default function Store(props: HomeProps){
    const { level, currentExperience, currentLife, currentStamina, currentMoney } = useContext(ChallengesContext);
  
    

    return (
        <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        currentLife={props.currentLife} 
        currentStamina={props.currentStamina}
        currentMoney={props.currentMoney}
        challengesCompleted={props.challengesCompleted}
        idStudyArea='false'>
        <div className={styles.container}>
        <div className={styles.homeContainer}>
            <div></div>
        <CharacterProfile />
        <LifeBar />
        <StaminaBar />
        <ExperienceBar />
            <StoreProvider></StoreProvider>
        </div>
        </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
    const { level, currentExperience, currentLife, currentStamina, currentMoney, challengesCompleted } = context.req.cookies;
  
    return {
      props: {
        level: Number(level), 
        currentExperience: Number(currentExperience), 
        currentLife: Number(currentLife), 
        currentStamina: Number(currentStamina),
        currentMoney: Number(currentMoney), 
        challengesCompleted: Number(challengesCompleted)
      }
    }
  }