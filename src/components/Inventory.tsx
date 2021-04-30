import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { StoreContext } from '../contexts/StoreContext';
import Modal from '@material-ui/core/Modal';

import { Button, makeStyles } from '@material-ui/core';

import armors from '../JSON/armors.json';
import styles from '../styles/components/Inventory.module.css'

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

const Inventory = props =>{
    const {username} = useContext(ChallengesContext);
    
    const [itemType, setItemType] =  useState();
    const [ id, setID ] = useState();
    
    const [open, setOpen] = useState(false);

    const classes = useStyles();    
    const [modalStyle] = useState(getModalStyle);

    const [armorInventory, setArmorInventory] = useState([]);
    const [swordInventory, setSwordInventory] = useState([]);
    const [helmetInventory, setHelmetInventory] = useState([]);
    const [backgroundInventory, setBackgroundInventory] = useState([]);

    useEffect(() => {
        axios.get(`/api/users/${username}`)
        .then((response) => {
            console.log(response.data.user);
            setArmorInventory(response.data.user.inventoryArmor);
            setSwordInventory(response.data.user.inventorySword);
            setHelmetInventory(response.data.user.inventoryHelmet);
            setBackgroundInventory(response.data.user.inventoryBackground);
            
            console.log(armorInventory);
            
          });
    }, [])

    const inventario = () => {
        try {
            const data =  axios.get(`/api/users/${username}`).then((response) => {
                setArmorInventory(response.data.users.inventoryArmor);
                setSwordInventory(response.data.users.inventorySword);
                setHelmetInventory(response.data.users.inventoryHelmet);
                setBackgroundInventory(response.data.users.inventoryBackground);
                console.log(response.data.users.value)
              });
            
            console.log(data);
        } catch (err) {
            alert('Não foi possivel realizar o login, tente novamente mais tarde!');
        }
    }

    const handleClick =() => {
        props.EquipItem(itemType, id);
        setOpen(false);
    }

    const handleOpen = (type, id) => {
        setItemType(type)
        setID(id);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    let body = (
        <div style={modalStyle} className={classes.paper}>
            <p className={classes.price} id="simple-modal-description">
            </p>
            <Button variant="contained" color="secondary" onClick={handleClick}>Equipar</Button>
        </div>
    );
    return(
        <div className={styles.challengeBoxContainer}>
                <div className={styles.challengeNotActive}>
                <strong>
                    <img src="icons/chest.png" alt="Inventário" />
                    Inventário
                </strong>
            </div>
            <div>
                <a> Armaduras </a> 
            </div>
            <div className={styles.storeItems}>
                {armorInventory.map((armor) => armor != null && (
                <p>
                    <img src={`itemSprite/armor/store/armor${armor}.png`} onClick={() => handleOpen('armor', armor)} alt='armor'/>
                    
                </p>))}  
            </div>
            <div>
                <a> Espadas </a> 
            </div>
            <div className={styles.storeItems}>
                {swordInventory.map((sword) => sword != null && (
                <p>
                    <img src={`itemSprite/sword/store/sword${sword}.png`} onClick={() => handleOpen('sword',sword)} alt='sword'/>
                    
                </p>))}  
            </div>
            <div>
                <a> Capacetes </a> 
            </div>
            <div className={styles.storeItems}>
                {helmetInventory.map((helmet) => helmet != null && (
                <p>
                    <img src={`itemSprite/helmet/store/helmet${helmet}.png`} onClick={() => handleOpen('helmet', helmet)} alt='helmet'/>
                    
                </p>))}  
            </div>
            <div>
                <a> Plano de fundo </a> 
            </div>
            <div className={styles.storeItems}>
                {backgroundInventory.map((background) => background != null && (
                <p>
                    <img className={styles.storeItemsBackground}  src={`itemSprite/background/background${background}.png`} onClick={() => handleOpen('background', background)} alt='background'/>
                    
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
export default Inventory;