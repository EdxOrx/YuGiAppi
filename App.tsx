import React, { useEffect, useState, createContext } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {default as MaterialIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as Ionicon} from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/Home/Home';
import Favorites from './src/screens/Favorites/Favorites';
import Settings from './src/screens/Settings/Settings';
import getData from './src/config/api'
import { YuGiOhContext } from './src/context/CardsContext';
import { IYuGiOhCard } from './src/@types/types';
import { MMKV } from 'react-native-mmkv';
import { Dirs, FileSystem } from 'react-native-file-access';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
    const [yugiData, setYugiData] = useState<IYuGiOhCard[]>([]),
          storage = new MMKV(),
          [keys, setkeys] = useState<number>(0),
          [config, setConfig] = useState();

    const getNumberKeys = async () => {
        let allKeys = storage.getAllKeys();
        setkeys(allKeys.length);
    };

    const loadConfig = async () => {
        try {
            const textConfig = await FileSystem.readFile(Dirs.CacheDir + '/config.txt');
            const jsonConfig = JSON.parse(textConfig);
            console.log('//*******>jsonConfig');
            console.log(textConfig);
            console.log('//*******>jsonConfig');
            setConfig(jsonConfig);
        } catch (error) {
            FileSystem.writeFile(Dirs.CacheDir + '/config.txt', '{}')
        }
    }

    
    useEffect(() => {
        loadConfig();
        async function fetchData() {
            let response:Array<IYuGiOhCard> = await getData(config);
            setYugiData(response);
        }

        fetchData();

        const listener = storage.addOnValueChangedListener(changedKey => {
            if (changedKey) {
                getNumberKeys();
            }
        });

        if(keys === 0) {
            getNumberKeys();
        }
    
        return () => {
            listener.remove();
        };
    }, []);

  	return (
        <YuGiOhContext.Provider value={yugiData}>
            <PaperProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                if (route.name === 'Home') {
                                    return focused ? <MaterialIcon name='cards' size={30} color={focused ? '#446ee1' : 'gray'}/> : 
                                    <MaterialIcon name='cards-outline' size={30} color={focused ? '#446ee1' : 'gray'}/> ;
                                } else if (route.name === 'Favorites') {
                                    return focused ? <MaterialIcon name='cards-heart' size={30} color={focused ? '#446ee1' : 'gray'}/> : 
                                    <MaterialIcon name='cards-heart-outline' size={30} color={focused ? '#446ee1' : 'gray'}/> ;
                                } else if (route.name === 'Settings') {
                                    return focused ? <Ionicon name='settings' size={30} color={focused ? '#446ee1' : 'gray'}/> : 
                                    <Ionicon name='settings-outline' size={30} color={focused ? '#446ee1' : 'gray'}/> ;
                                }
                            },
                            tabBarActiveTintColor: '#446ee1',
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                        })}>

                        <Tab.Group>
                            <Tab.Screen name='Home' component={Home} />
                            <Tab.Screen name='Favorites' component={Favorites} options={{ tabBarBadge: keys === 0 ? undefined : keys }}/>
                            <Tab.Screen name='Settings' component={Settings}/>
                        </Tab.Group>
                    </Tab.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </YuGiOhContext.Provider>
  	);
}

export default App;
