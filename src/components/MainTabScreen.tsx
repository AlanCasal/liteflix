import React from 'react';
import { Image, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MisPeliculasScreen from '../screens/MisPeliculasScreen';
import AgregarModalScreen from '../screens/AgregarModalScreen';

import { CardStyleInterpolators } from '@react-navigation/stack';

const HomeStack     = createStackNavigator(),
      MisPelisStack = createStackNavigator(),
      AgregarStack  = createStackNavigator(),
      Tab           = createBottomTabNavigator();

const LogoTitle = () => <Image source={ require( '../../assets/liteflix-logo.png' ) } />;

const forFade = ( { current } ) => ( {
    cardStyle: {
        opacity: current.progress,
    },
} );

const headerConfig = ( navigation, headerTransparent = false ) => ({
    headerTitleAlign: 'center',
    title: 'liteflix',
    headerTitle: () => <LogoTitle />,
    headerStyle: {
        elevation: 0,
        backgroundColor: '#000',
        borderBottomColor: '#000000',
        borderWidth: 0
    },
    headerTintColor: '#FF0000',
    headerTransparent,
    headerLeft: () => (
        <MaterialCommunityIcons
            name="menu"
            size={ 28 }
            color={ 'white' }
            onPress={ () => navigation.openDrawer() }
            title="Menu"
            style={ { paddingLeft: 15.5 } }
        />
    ),
    // cardStyleInterpolator: forFade,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
});

const emptyScreen = () => (
    <View style={ {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    } }>
        <Text style={ { color: '#FFF' } }>Página Vacía</Text>
    </View>
);

const HomeStackScreen = ( { navigation } ) => (
    <HomeStack.Navigator
        initialRouteName="Inicio Stack"
        screenOptions={ headerConfig( navigation, true ) }
    >
        <HomeStack.Screen
            name="Inicio Stack"
            component={ HomeScreen }
            options={ {
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            } }
        />
    </HomeStack.Navigator>
);

const MisPeliculasStackScreen = ( { navigation } ) => (
    <MisPelisStack.Navigator
        initialRouteName="Mis Peliculas"
        screenOptions={ headerConfig(navigation) }
    >
        <MisPelisStack.Screen
            name="Mis Peliculas"
            component={ MisPeliculasScreen }
        />
    </MisPelisStack.Navigator>
);

const AgregarStackScreen = ( { navigation } ) => (
    <AgregarStack.Navigator
        initialRouteName="Agregar Pelicula"
        screenOptions={ headerConfig(navigation) }
    >
        <AgregarStack.Screen
            name="Agregar Pelicula"
            component={ AgregarModalScreen }
        />
    </AgregarStack.Navigator>
);

const MainTabScreen = ({ navigation }) => (
    <Tab.Navigator
        initialRouteName="Inicio"
        tabBarOptions={ {
            activeTintColor: '#FFF',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: '#000',
                borderTopWidth: 0,
                borderTopColor: '#000',
                height: 49,
            },
            labelStyle: {
                fontFamily: 'Montserrat_400Regular',
                lineHeight: 10,
                fontSize: 8,
                marginBottom: 8
            }
        } }
    >
        <Tab.Screen
            name="Inicio"
            component={ HomeStackScreen }
            options={ {
                tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="home-outline" size={ 26 } color={ color } />
            } }
        />
        <Tab.Screen
            name="Mis Películas"
            component={ MisPeliculasStackScreen }
            options={ {
                tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="heart-outline" size={ 26 } color={ color } />
            } }
        />
        <Tab.Screen
            name="Buscar"
            component={ emptyScreen }
            options={ {
                tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="magnify" size={ 26 } color={ color } />
            } }
        />
        <Tab.Screen
            name="Agregar"
            component={ AgregarStackScreen }
            options={ {
                tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="video-plus-outline" size={ 28 } color={ color } />
            } }
        />
        <Tab.Screen
            name="Mi Perfil"
            component={ emptyScreen }
            options={ {
                tabBarIcon: ( { color } ) => <MaterialCommunityIcons name="account-outline" size={ 26 } color={ color } />
            } }
        />
    </Tab.Navigator>
);

export default MainTabScreen;
