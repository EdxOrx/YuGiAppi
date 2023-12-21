import { FC } from 'react';
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {YuGiOhCardProps} from '../@types/types';
import {dimensions, card} from '../base/base';
import {default as Ionicon} from 'react-native-vector-icons/Ionicons';

const Card: FC<YuGiOhCardProps> = ({item, openModal}:YuGiOhCardProps) => {
    const iconsLevel = [],
          isTrapSpellCard = item.type === 'Trap Card' || item.type === 'Spell Card';

    for (let i = 0; i < item.level; i++) {
        iconsLevel.push(
            <Ionicon key={i} name='star' size={10} style={styles.levelIcon} color={'#ffd900'}/>
        );
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => openModal(true, item)}>
            <Image
                style={styles.imageContainer}
                source={{uri: item.card_images[0]?.image_url_small}}
            />

            <View style={styles.cardInfo}>
                <View style={styles.cardInfoWrapper}>

                    <View style={styles.cardRowContainer}>
                        <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>
                        <View style={styles.levelContainer}>
                            {iconsLevel}
                        </View>
                    </View> 

                    <Text style={styles.cardRace}>{item.race}</Text>

                    <View style={styles.cardDescriptionContainer}>
                        <Text numberOfLines={3} style={styles.cardDescription}>{item.desc}</Text>
                    </View>

                    {!isTrapSpellCard && <View style={[styles.cardRowContainer, styles.alignBottom]}>
                        <Text style={styles.cardAttack}>ATK: {item.atk}</Text>
                        <Text style={styles.cardDefense}>DEF: {item.def}</Text>
                    </View>}

                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    alignBottom: {
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingLeft: 10,
    },
    cardContainer: {
        backgroundColor: '#fff',
        paddingTop: 10 ,
        paddingBottom: 10 ,
        paddingLeft: 10 ,
        paddingRight: 10 ,
        flexDirection: 'row',
        position: 'relative',
        flex: 1,
        marginBottom: 5,
        width: '100%' 
    },
    cardInfo: {
        position: 'relative',
        width: '100%',
    },
    cardInfoWrapper: {
        position: 'absolute', 
        flexDirection:'column', 
        paddingLeft: 10, 
        height: '100%',
        width: (dimensions.fullWidth - (card.smWidth + 20)) 
    },
    cardDescriptionContainer: {
        flexDirection: 'row',
        color: '#5a5c5d'
    },
    cardDescription: {
        flex: 1, 
        flexWrap: 'wrap',
        fontFamily: 'RobotoRegular',
        fontSize: 14,
        paddingTop: 2
    },
    cardTitle: {
        fontFamily: 'RobotoBold',
        fontSize: 20,
        color: '#141823'
    },
    cardRace: {
        fontFamily: 'RobotoMedium',
        fontSize: 17,
        color: '#555'
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
    imageContainer: {
        width: card.smWidth,
        height: 123,
        padding: 5
    },
    levelContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        alignItems: 'flex-start',
    },
    levelIcon: {
        backgroundColor: '#e4611a', 
        borderRadius: 10, 
        padding: 2, 
        margin: 1
    }
});

export default Card;
