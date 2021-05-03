import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './src/components/MainTabScreen';
import DrawerContent from './src/components/DrawerContent';

import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import {
    Raleway_400Regular,
    Raleway_800ExtraBold,
} from '@expo-google-fonts/raleway';

import { MisPeliculasContextProvider } from "./src/contexts/MisPeliculasContext";
import LoadingScreen from './src/screens/LoadingScreen';

const Drawer = createDrawerNavigator();

const App = () => {
    let [ fontsLoaded ] = useFonts( {
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Raleway_400Regular,
        Raleway_800ExtraBold,
    } );

    return !fontsLoaded 
        ? <LoadingScreen />
        : (
        <MisPeliculasContextProvider>
            <NavigationContainer>
            
                <Drawer.Navigator
                    initialRouteName="Inicio Drawer"
                    drawerContent={ props => <DrawerContent { ...props } /> }
                >
                    <Drawer.Screen
                        name="Inicio Drawer"
                        component={ MainTabScreen }
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </MisPeliculasContextProvider>
    );
}

export default App;
