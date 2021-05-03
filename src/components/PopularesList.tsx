import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import usePopularesPelis from '../hooks/usePopularesPelis';

const PopularesList = () => {
    const [ popularesPelis ] = usePopularesPelis();

    const posters = popularesPelis.map( ( imgUrl, idx ) => (
        <Image
            source={ { uri: `https://image.tmdb.org/t/p/w500${ imgUrl }` } }
            style={ styles.imgStyle }
            key={ idx }
        /> )
    );

    return popularesPelis.length ? (
        <View style={ styles.viewStyle }>
            <Text style={ styles.whiteTextStyle }>Populares de Liteflix</Text>

            <View style={ styles.postersWrapperStyle }>
                { posters }
            </View>
            
        </View>
    )
    : null;
};

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 40,
        marginBottom: 24,
    },
    postersWrapperStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    imgStyle: {
        height: 328,
        marginBottom: 10,
        width: (Dimensions.get( 'window' ).width / 2) - 18,
    },
    whiteTextStyle: {
        color: 'white',
        marginBottom: 10,
        marginHorizontal: 15,
        fontSize: 20,
        fontFamily: 'Raleway_800ExtraBold',
        textTransform: 'uppercase',
        lineHeight: 23
    },
});

export default PopularesList;
