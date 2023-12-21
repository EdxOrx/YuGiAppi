import { FC, useEffect, useState } from 'react';
import {StyleSheet, View, Modal, ImageBackground, Text, ScrollView} from 'react-native';
import {ModalViewProps} from '../@types/types';
import {default as Ionicon} from 'react-native-vector-icons/Ionicons';
import { IconButton, List } from 'react-native-paper';
import { isEmpty, slice, replace, toString, is } from 'rambda';
import { MMKV } from 'react-native-mmkv';

const capitalizeWord = (word: string) => `${word[0].toUpperCase()}${slice(1, Infinity, word)}`;  

const ModalView: FC<ModalViewProps> = ({closeModal, isModalVisible, card}: ModalViewProps) => {
    const storage = new MMKV(),
          strCardId = toString(card?.id || ''),
          [isFavorite, setIsFavorite] = useState<boolean>(false),
          close = () => closeModal(false),
          iconsLevel = [],
          isTrapSpellCard = card?.type === 'Trap Card' || card?.type === 'Spell Card',
          frameType = card?.frameType,
          race = card?.race,
          cardSets = card?.card_sets,
          cardPrices = card?.card_prices;

    let prices: React.ReactElement[] = [],
        sets: React.ReactElement[] = [];

    useEffect(() => {
        async function fetchFavorite() {
            let response:boolean = await storage.getString(strCardId) ? true : false;

            if(response) {
                setIsFavorite(true);
            }else{
                setIsFavorite(false);
            }
        }
        
        fetchFavorite();
    }, [isFavorite, card]);

    const saveCard = () => {
        if(isFavorite) {
            storage.delete(strCardId);
            setIsFavorite(false);
        }else{
            storage.set(strCardId, JSON.stringify(card));
            setIsFavorite(true);
        }
    };

    if(card?.level) {
        for (let i = 0; i < card?.level; i++) {
            iconsLevel.push(
                <Ionicon key={i} name='star' size={10} style={styles.levelIcon} color={'#ffd900'}/>
            );
        }
    }

    if(cardSets?.length){
        for (const set of cardSets) {
            let name:string = set?.set_name;
            let code:string = set?.set_code;
            let rarity:string = set?.set_rarity;
            let price:string = set?.set_price;

            sets.push( <List.Item
                key={`${name}-${code}-${price}-${rarity}`}
                title={name}
                description={set?.set_rarity}
                left={() => <Text>{set?.set_code}</Text>}
                right={() => <Text>${set?.set_price}</Text>}
            />);
        }
    }


    if(cardPrices?.length){
        for (const [key, value] of Object.entries(cardPrices[0])) {
            prices.push(<List.Item
                key={key}
                title={replace('_price','',key)}
                right={() => <Text>${value}</Text>}
            />);
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={close}
            >
                <ScrollView>
                <View style={styles.container}>
                    <ImageBackground 
                    source={{uri: card?.card_images[0]?.image_url}} 
                    resizeMode="cover"
                    style={styles.cardImage}>
                         <View style={styles.favoritesButtonContainer}>
                            <IconButton 
                                icon="heart" 
                                containerColor="rgba(255,255,255,0.6)"
                                iconColor={isFavorite ? 'red' : 'rgba(0,0,0,0.6)'}
                                onPress={saveCard} />
                        </View>
                    </ImageBackground>
                    <View style={styles.cardInfoContainer}>

                        <Text style={styles.cardTitle}>{card?.name}</Text>
                        
                        {!isEmpty(iconsLevel) && <View style={styles.levelContainer}>
                            {iconsLevel}
                        </View>}
                        
                        {(race || frameType) && 
                            <Text style={styles.raceFrameType}>
                                [{race && capitalizeWord(race)}{race && '/'}{frameType && capitalizeWord(frameType)}]
                            </Text>}
                        <Text style={styles.cardDescription}>{card?.desc}</Text>
                        
                        {!isTrapSpellCard && <View style={styles.cardRowContainer}>
                            <Text style={styles.cardAttack}>ATK: {card?.atk}</Text>
                            <Text style={styles.cardDefense}>DEF: {card?.def}</Text>
                        </View>}
                    
                        <List.AccordionGroup>
                            <View>
                            
                                <List.Accordion title="Sets" id="1">
                                {!isEmpty(sets) && sets}
                                </List.Accordion>

                                <List.Accordion title="Prices" id="2">
                                {!isEmpty(prices) && prices}
                                </List.Accordion>
                            </View>
                        </List.AccordionGroup>

                    </View>
                </View>
                </ScrollView>
                <View style={styles.closeButtonContainer}>
                    <IconButton 
                        icon="close" 
                        containerColor="rgba(255,255,255,0.6)"
                        onPress={close} />
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'
    },
    cardInfoContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    closeButtonContainer: {
        position: 'absolute', 
        right: 0,  
        top: 0
    },
    cardImage: {
        flex: 1,
        width: '100%',
        height: 400,
        alignSelf: 'center'
    },
    cardTitle: {
        fontFamily: 'RobotoBold',
        fontSize: 25,
        color: '#141823'
    },
    favoritesButtonContainer:{
        position: 'absolute', 
        left: 0,  
        bottom: 0
    },
    setWrapper: {

    },
    setName: {

    },
    setCode: {

    },
    setRarity: {

    },
    setRarityCode: {

    },
    setPrice: {

    },
    levelContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        alignItems: 'flex-start',
    },
    cardDescription: {
        flex: 1, 
        flexWrap: 'wrap',
        fontFamily: 'RobotoRegular',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 10,
    },
    levelIcon: {
        backgroundColor: '#e4611a', 
        borderRadius: 10, 
        padding: 2, 
        margin: 1
    },
    cardAttack: {
        alignItems: 'flex-start',
        fontFamily: 'RobotoRegular',
        fontSize: 14,
        color: '#5a5c5d'
    },
    cardDefense: {
        alignItems: 'flex-end',
        fontFamily: 'RobotoRegular',
        fontSize: 14,
        color: '#5a5c5d'
    },
    cardRowContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    raceFrameType: {
        fontFamily: 'RobotoMedium',
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#555'
    }
});

export default ModalView;
