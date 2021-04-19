import { useContext, useState } from 'react';
import styles from '../styles/components/StudyArea.module.css';


export const StudyArea =({setStudyArea}) =>{
  const onButtonClick=(area)=>{
    setStudyArea(area)
  }

  return (
    <section className={styles.containerStudyArea} >
      <div>
        <button type="button" id="portugues" className={styles.portugues} onClick={() => onButtonClick('portugues')}>Português</button>
        <button type="button" id="matematica" className={styles.matematica} onClick={() => onButtonClick('matematica')}>Matemática</button>
        <button type="button" id="geografia" className={styles.geografia} onClick={() => onButtonClick('geografia')}>Geografia</button>
      </div>
      <div>  
        <button type="button" id="historia" className={styles.historia} onClick={() => onButtonClick('historia')}>História</button>
        <button type="button" id="fisica" className={styles.fisica} onClick={() => onButtonClick('fisica')}>Física</button>
        <button type="button" id="quimica" className={styles.quimica} onClick={() => onButtonClick('quimica')}>Química</button>
      </div>
    </section>
  )
}