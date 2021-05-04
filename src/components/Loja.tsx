import { useContext, useState } from 'react';
import armors from '../JSON/armors.json';
import swords from '../JSON/swords.json';
import helmet from '../JSON/helmet.json';
import background from '../JSON/background.json';

import Modal from '@material-ui/core/Modal';
import styles from '../styles/components/Inventory.module.css'
import { Button, makeStyles } from '@material-ui/core';
import { ChallengesContext } from '../contexts/ChallengesContext';

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
      width: 250,
      spacing:4,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid  #b8860b',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 8, 4),
    },
    price: {
        margin: "5px",
        padding: "5px"
    },
}));

interface LojaProps {
    id: number;
}


const Loja = props =>{
    const { currentMoney } = useContext(ChallengesContext);
    
    const [itemDescricao, setItemDescricao] = useState('');
    const [itemPreco, setItemPreco] = useState();
    const [itemType, setItemType] =  useState();
    const [ id, setID ] = useState(0);

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleClick =() => {
        if (currentMoney < Number(itemPreco)){
            alert("Não possuí dinheiro suficiente para a compra!");
        } else {
            props.BuyItem(id , itemType, itemPreco);
        }
        setOpen(false);
    }
    

    const handleOpen = (data) => {
        setItemDescricao(data.description);
        setItemPreco(data.price);
        setItemType(data.type)
        setID(data.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">{itemDescricao}</h3>
            <p className={classes.price} id="simple-modal-description">
                Preço: {itemPreco}
            </p>
            <Button variant="contained" color="secondary" onClick={handleClick}>Comprar</Button>
        </div>
    );
    
    return(
        <div className={styles.challengeBoxContainer}>
                <div className={styles.challengeNotActive}>
                <strong>
                    <img src="icons/chest2.png" alt="Inventário" />
                    Loja                
                </strong>
                
                </div>
                <div>
                <section className={styles.vendedor}>
                    <div>
                    <img src="assets/vendedor.png" alt="Vendedor" />
                    </div>
                    <div>
                        <p>Ei, olá jovem aventureiro!</p>
                        <p>Parece que você juntou algum dinheiro dos desafios.</p>
                        <p>Gostaria de comprar algo na minha loja?</p>
                    </div>
                </section>
                </div>
                <div>
               <a> Armaduras </a> 
                </div>
                <div className={styles.storeItems}>
                    {armors.map((armor) => (
                    <p>
                        <img src={`itemSprite/armor/store/${armor.image}`} onClick={() => handleOpen(armor)} alt='armor'/>
                        
                    </p>))}  
                </div>
                <div>
                <a> Espadas </a> 
                </div>
                <div className={styles.storeItems}>
                    {swords.map((sword) => (
                    <p>
                        <img src={`itemSprite/sword/store/${sword.image}`} onClick={() => handleOpen(sword)} alt='sword'/>
                        
                    </p>))}  
                </div>
                <div>
                <a> Capacetes </a> 
                </div>
                <div className={styles.storeItems}>
                    {helmet.map((helmet) => (
                    <p>
                        <img src={`itemSprite/helmet/store/${helmet.image}`} onClick={() => handleOpen(helmet)} alt='helmet'/>
                        
                    </p>))}  
                </div>
                <div>
                <a> Plano de fundo </a> 
                </div>
                <div className={styles.storeItems}>
                    {background.map((background) => (
                    <p>
                        <img className={styles.storeItemsBackground} src={`itemSprite/background/${background.image}`} onClick={() => handleOpen(background)} alt='background'/>
                        
                    </p>))}  
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

export default Loja;