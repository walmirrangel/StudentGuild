import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import Inventory from '../components/Inventory';
import Loja from '../components/Loja';
import armors from '../JSON/armors.json';
import Store from '../pages/Store';
import { ChallengesContext, ChallengesProvider } from './ChallengesContext';

import styles  from '../styles/components/Store.module.css'
import axios from 'axios';

interface StoreProviderProps {
}

export const StoreContext = createContext({});


export function StoreProvider({ ...rest }: StoreProviderProps) {
    const {currentMoney, username, equipItem} = useContext(ChallengesContext);
    

    function EquipItem(type, id){
        switch (type) {
            case 'armor':
                axios.post(`/api/users/${username}`, {
                    username,
                    equip:true,
                    equipedArmor:id,
                })
            break;
            case 'sword':
                axios.post(`/api/users/${username}`, {
                    username,
                    equip:true,
                    equipedSword:id,
                })
            break;
            case 'helmet':
                axios.post(`/api/users/${username}`, {
                    username,
                    equip:true,
                    equipedHelmet:id,
                })
            break;
            case 'background':
                axios.post(`/api/users/${username}`, {
                    username,
                    equip:true,
                    equipedBackground:id,
                })
            break;
            default:
            break;
        }
        equipItem();
    }


    function BuyItem(value, value2, itemPreco) {
        var attMoney = (currentMoney - Number(itemPreco));
        switch (value2) {
            case 'armor':
                axios.post(`/api/users/${username}`, {
                    username,
                    inventoryArmor:value,
                })
            break;
            case 'sword':
                axios.post(`/api/users/${username}`, {
                    username,
                    inventorySword:value,
                }) 
            break;
            case 'helmet':
                axios.post(`/api/users/${username}`, {
                    username,
                    inventoryHelmet:value,
                })  
            break;
            case 'background':
                axios.post(`/api/users/${username}`, {
                    username,
                    inventoryBackground:value,
                })
            break;
            default:
            break;
        }
        axios.post(`/api/users/${username}`, {
            username,
            currentMoney:attMoney,
        })
        equipItem();
    }

    return(
        <StoreContext.Provider 
         value ={{
         }}>
            <section className={styles.homeSection} >
              <div>
                  <Inventory EquipItem={EquipItem}/>
              </div>
              <div>
                  <Loja BuyItem={BuyItem}/>
              </div>
            </section>
        </StoreContext.Provider>
      ) 
}