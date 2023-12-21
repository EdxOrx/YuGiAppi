import { FC, useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Dirs, FileSystem } from 'react-native-file-access';

const Card: FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const setConfig = async () => {
        await FileSystem.writeFile(Dirs.CacheDir + '/config.txt', `{language: ${selectedLanguage}}`)
        const textConfig = await FileSystem.readFile(Dirs.CacheDir + '/config.txt');
        console.log('<<<<< Settings');
        console.log(textConfig);
        console.log('<<<<< Settings');
    }
    
    useEffect(() => {
        setConfig();
    }, [selectedLanguage])

    const changeLanguage = (itemValue: string) => {
        setSelectedLanguage(itemValue);
    }

    return <Picker
            selectedValue={selectedLanguage}
            onValueChange={changeLanguage}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="portuguese" value="pt" />
    </Picker>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});

export default Card;
