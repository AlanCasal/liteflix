import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={ styles.containerStyle }>
            <Image source={ require( '../../assets/liteflix-logo.png' ) } />
        </View>
    );
};

const styles = StyleSheet.create( {
    containerStyle: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        color: '#FF0000',
        fontSize: 48,
        fontWeight: 'bold',
        letterSpacing: 1
    }
} );

export default LoadingScreen;
