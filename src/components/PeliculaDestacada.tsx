import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import usePeliculaDestacada from '../hooks/usePeliculaDestacada';
import { LinearGradient } from 'expo-linear-gradient';

const PeliculaDestacada = () => {
    const [ peliDestacada ] = usePeliculaDestacada();
    
    return (
        <View>
            { Object.keys( peliDestacada ).length ?
            <Image
                source={ { uri: `https://image.tmdb.org/t/p/w500${ peliDestacada.poster_path }` } }
                style={ styles.imgStyle }
            />
            : null }

            <TouchableOpacity style={ styles.playBtnStyle } onPress={() => console.log('reproducir')}>
                <Image
                    source={ require( '../../assets/play.png' ) }
                    style={ styles.playBtnImgStyle }
                />
                <Text style={ styles.playBtnTextStyle } >Reproducir</Text>
            </TouchableOpacity>
            
            <IconButton
                icon="plus"
                color={ 'white' }
                size={ 20 }
                style={ styles.addBtnStyle }
                onPress={ () => console.log('agregar película') }
            />

            <LinearGradient
                colors={ [ 'transparent', '#000' ] }
                style={ styles.bottomGradientStyle }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imgStyle: {
        width: '100%',
        height: Dimensions.get( 'window' ).height / 1.2,
    },
    playBtnStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "absolute",
        top: '60%',
        width: 160,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    playBtnImgStyle: {
        width: 12,
        height: 16,
    },
    playBtnTextStyle: {
        color: '#FFF',
        marginLeft: 7,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20
    },
    addBtnStyle: {
        position: "absolute",
        top: '60%',
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderWidth: 1,
        right: 15
    },
    bottomGradientStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
    },
});

export default PeliculaDestacada;
