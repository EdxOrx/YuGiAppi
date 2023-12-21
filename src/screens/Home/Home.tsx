import { FC } from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Cards from '../../components/Cards';
import {useYuGiOhContext} from '../../context/CardsContext';

const Home: FC = () => {
    const yugiohCards = useYuGiOhContext();

    return (
        <SafeAreaView style={styles.container}>
            <Cards cards={yugiohCards}/>
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

export default Home;
