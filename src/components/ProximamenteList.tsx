import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import useProximasPelis from '../hooks/useProximasPelis';

const ProximamenteList = () => {
    const [ proximasPelis ] = useProximasPelis();
    const { imgStyle, whiteTextStyle, viewStyle } = styles;

    const posters = proximasPelis.map( (imgUrl, idx) => (
        <Image
            source={ { uri: `https://image.tmdb.org/t/p/w500${ imgUrl }` } }
            style={ imgStyle }
            key={ idx }
        /> )
    );

    return proximasPelis.length 
        ? (
        <View style={ viewStyle }>
            <Text style={ whiteTextStyle }>Próximamente</Text>
            
            { posters }
        </View> )
        : null;
};

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: -50
    },
    imgStyle: {
        flex: 1,
        height: 201,
        marginHorizontal: 15,
        marginBottom: 10
    },
    whiteTextStyle: {
        color: 'white',
        marginBottom: 10,
        marginHorizontal: 15,
        fontSize: 20,
        lineHeight: 23,
        fontFamily: 'Raleway_800ExtraBold'
    }
});

export default ProximamenteList;
