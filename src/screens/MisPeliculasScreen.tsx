import React from 'react';
import { Image, Text, StyleSheet, ScrollView, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useMisPeliculasContext } from '../contexts/MisPeliculasContext';

const MisPeliculasScreen = () => {
    const { misPeliculasState } = useMisPeliculasContext();

    const posters = misPeliculasState.map( ( { imagen, nombre }, idx ) => (
        <View key={ idx }>
            <Image
                source={ { uri: imagen } }
                style={ styles.imgStyle }
            />

            <Text style={ [ styles.whiteTextStyle, styles.movieNameStyle ] } >{ nombre }</Text>
        </View>
    ) );

    return (
        <View style={ {
            flex: 1,
            backgroundColor: '#000',
        } } >
            <StatusBar style="light" />
            <ScrollView style={ styles.containerStyle } >
                <Text style={ styles.whiteTextStyle }>Mis Películas</Text>

                { misPeliculasState.length 
                    ? posters
                    : <Text style={ styles.noHayPelisStyle } >No tenés películas guardadas</Text>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 15,
        marginBottom: 24
    },
    whiteTextStyle: {
        color: 'white',
        marginBottom: 10,
        fontFamily: 'Raleway_800ExtraBold',
        textTransform: 'capitalize',
        fontSize: 20,
        lineHeight: 23
    },
    imgStyle: {
        height: 201,
        marginBottom: 10,
        width: '100%'
    },
    movieNameStyle: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    noHayPelisStyle: {
        color: '#FFF',
        fontFamily: 'Raleway_400Regular',
        textAlign: 'center',
        marginTop: 50
    }
});

export default MisPeliculasScreen;
