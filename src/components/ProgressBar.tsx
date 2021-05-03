import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Progressbar = ({ onCancelar, onComplete }) => {
    const [ percent, setPercent ] = useState( 0 );

    const anim = new Animated.Value( 0 );

    useEffect(() => {
        onAnimate();
    }, []);

    const onAnimate = () => {
        anim.addListener( ({ value }) => setPercent( parseInt( value, 10 ) ) );

        Animated.timing(anim, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: true
        }).start(() => onComplete() );
    };

    const handleCancelar = () => anim.stopAnimation( () => onCancelar() );

    return (
        <View style={ styles.containerStyle } >
            <Animated.Text
                style={ {
                    ...styles.textSyle,
                    fontFamily: percent !== 100 ? 'Montserrat_400Regular' : 'Montserrat_700Bold'
                } }
            >
                { percent !== 100
                    ? `Cargando ${ percent }%`
                    : '100% Cargado'
                }
            </Animated.Text>

            <View style={ styles.barContainerStyle }>
                <Animated.View
                    style={ [
                        styles.progressBarStyle,
                        { width: `${ percent }%` }
                    ] }
                />
            </View>

            <TouchableOpacity
                style={ styles.cancelarContainerStyle }
                onPress={ handleCancelar }
            >
                <Text style={ styles.cancelarTextStyle } >CANCELAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 16,
        marginTop: 48,
        marginBottom: 39,
    },
    barContainerStyle: {
        width          : '100%',
        height         : 12,
        backgroundColor: '#DEDEDE',
        borderRadius   : 20,
        justifyContent : 'center',
    },
    progressBarStyle: {
        height         : 12,
        borderRadius   : 20,
        backgroundColor: '#7ED321'
    },
    textSyle: {
        fontSize : 10,
        marginBottom: 8,
    },
    cancelarContainerStyle: {
        alignItems: 'center',
        marginTop: 16,
    },
    cancelarTextStyle: {
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
        color: '#4A4A4A'
    }
});

export default Progressbar;
