import { FC, useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import Cards from '../../components/Cards';
import { IYuGiOhCard } from '../../@types/types';


const Card: FC = () => {
    const storage = new MMKV(),
          [cards, setCards] = useState<IYuGiOhCard[]>([]);
    
    const getFavorites = async () => {
        const keys = await storage.getAllKeys();
        let cardsAry: IYuGiOhCard[] = [];
    
        for (const idCard of keys) {
            let strCard:string = storage.getString(idCard) || '';
            cardsAry.push(JSON.parse(strCard));
        }
        
        setCards(cardsAry);
    };

    useEffect(() => {
        const listener = storage.addOnValueChangedListener(changedKey => {
            if (changedKey) {
                getFavorites();
            }
        });

        if (cards?.length === 0) {
            getFavorites();
        }

        return () => {
            listener.remove();
        };
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <Cards cards={cards}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});

export default Card;
