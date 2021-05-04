import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';


import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core';

import styles from '../styles/components/CharacterProfile.module.css';


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 450,
      spacing:2,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid  #b8860b',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2, 2),
      [theme.breakpoints.down('md')]: {
        width: 420,
        padding: theme.spacing(1, 7, 1, 0),
      },
    },
    price: {
        margin: "2px",
        padding: "2px",
        [theme.breakpoints.down('md')]: {
            margin: "2px",
            padding: "2px"
          },
    },
    avatar: {
        maxHeight:"3rem",
        maxWidth:"4rem"
    }
}));

export function CharacterProfile() {
    const { nickname, level, currentMoney, armorEquiped, swordrEquiped, helmetEquiped, backgroundEquiped } = useContext(ChallengesContext);

    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Informações sobre o jogo:</h3>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/avatar.jpg`} alt="avatar" />
                 - O avatar representa o jogador. Pode ser customizado com o dinheiro do jogo.
            </p>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/level.jpg`} alt="avatar" />
                 - O level é a representação em números do seu avanço no jogo, sempre que adquirir experiência suficiente, ganhará 1 level a mais.
            </p>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/dinheiro.jpg`} alt="avatar" />
                 - Representa o dinheiro do jogo, sempre que acertar uma questão nos desafios, ganhará uma quantidade de dinheiro.
            </p>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/vida.jpg`} alt="avatar" />
                 - A barra vermelha, representa sua vida no jogo. Será perdido pontos de vida quando cometer erros em desafios.
            </p>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/stamina.jpg`} alt="avatar" />
                 - A barra amarela representa sua stamina/vigor. Você perde stamina enquanto completa desafios, perdendo mais stamina ao cometer erros.
            </p>
            <p className={classes.price} id="simple-modal-description">
            <img className={classes.avatar} src={`/duvidasImg/experiencia.jpg`} alt="avatar" />
                 - A barra verde representa seus pontos de experiência, que serão adquiridos ao responder corretamente os desafios, ao alcançar certo nível, seus pontos acumulados somam 1 level.
            </p>
        </div>
    );


    return (
        <div className={styles.characterProfileContainer}>
            <div className={styles.backgroudImg}>
                <img className={styles.backgroudImgSRC} src={`/itemSprite/background/background${backgroundEquiped}.png`} alt="Background" />
                <img className={styles.player}src="/player/player.png" alt="Personagem" />
                <img className={styles.armor}src={`/itemSprite/armor/armor${armorEquiped}.png`} alt="Armor" />
                <img className={styles.sword}src={`/itemSprite/sword/sword${swordrEquiped}.png`}  alt="Sword" />
                <img className={styles.helmet}src={`/itemSprite/helmet/helmet${helmetEquiped}.png`}  alt="Helmet" />
            </div>
            <div>
                <strong>{nickname}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
                
                <p>          
                    <img src="icons/coin.svg" alt="coin" />
                    {currentMoney}
                </p>
            </div>
            <div>
            <img src={`/icons/duvidas.png`} className={styles.duvidas}  onClick={() => handleOpen()} alt="Duvidas" />
            </div>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
        </div>
    );
}