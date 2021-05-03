import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import PeliculaDestacada from '../components/PeliculaDestacada';
import ProximamenteList from '../components/ProximamenteList';
import PopularesList from '../components/PopularesList';

const HomeScreen = () => {
    return (
        <View style={ styles.containerStyle }>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={ false } >
                <LinearGradient
                    colors={ [ 'rgba(0,0,0,0.9)', 'transparent' ] }
                    style={ styles.gradientStyle }
                />
                <PeliculaDestacada />

                <ProximamenteList />
                
                <PopularesList />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create( {
    containerStyle: {
        flex: 1,
        backgroundColor: '#000',
    },
    gradientStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get( 'window' ).height / 3,
        zIndex: 2
    },
} );

export default HomeScreen;
