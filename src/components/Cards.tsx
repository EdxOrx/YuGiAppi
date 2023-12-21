import { FC, Fragment, useState } from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {IYuGiOhCard, CardsProps} from '../@types/types';
import { isEmpty } from 'rambda';
import Card from './Card';
import ModalView from './ModalView';

const Cards: FC<CardsProps> = ({cards}: CardsProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalCard, setModalCard] = useState<IYuGiOhCard|null>(null);

    const openModal = (isOpen: boolean, cardData?:any) => {
        if (isEmpty(cardData)) {
            setIsModalVisible(isOpen);
        }else{
            setModalCard(cardData);
            setIsModalVisible(isOpen);
        }
    }

    return (
        <Fragment>
            <FlatList
            data={cards}
            renderItem={ ({item}) => { 

                return <Card 
                            item={item}
                            openModal={openModal}
                        />
                    }}
            />
            <ModalView 
                closeModal={openModal} 
                isModalVisible={isModalVisible} 
                card={modalCard}/>
            {cards?.length === 0 && <Text style={styles.noFavorites}>You do not have favorite cards</Text>}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    noFavorites: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'RobotoBold',
        fontSize: 25,
        color: '#5a5c5d'
    },
});

export default Cards;
