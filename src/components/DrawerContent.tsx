import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Avatar,
    Badge,
    Drawer,
    Text
} from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const userOptions = () => {
    const opts = [ 'Cambiar Usuario', 'Configuración', 'Ayuda' ];

    return opts.map( opt => (
        <View
            style={ styles.drawerItemStyle1 }
            key={ opt }
        >
            <TouchableOpacity>
                <Text style={ styles.itemTextStyle1 } >{ opt }</Text>
            </TouchableOpacity>
        </View>
    ));
};

const appSections = () => {
    const opts = [ 'Novedades', 'Series', 'Películas', 'Mi Lista', 'Niños' ];

    return opts.map(( opt, idx ) => {
        
        return idx === 0 ? (
            <View
                style={ styles.drawerItemStyle2 }
                key={ opt }
            >
                <TouchableOpacity style={ styles.novedadesOpacityStyle }>
                    <MaterialCommunityIcons
                        name="bell-outline"
                        size={ 18 }
                        color={ 'white' }
                        onPress={ () => null }
                        title="Menu"
                    />
                    <Badge size={ 8 } style={ styles.badgeStyle }></Badge>
                    <Text style={ styles.itemTextStyle2 } >{ opt }</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View 
                style={ styles.drawerItemStyle2 }
                key={ opt }
            >
                <TouchableOpacity>
                    <Text style={ styles.itemTextStyle2 } >{ opt }</Text>
                </TouchableOpacity>
            </View>
        );
    });
};

const DrawerContent = ( props ) => {
    return (
        <View style={ { flex: 1, backgroundColor: 'black' } }>
            <DrawerContentScrollView { ...props }>
                <View style={ styles.drawerContentStyle }>
                    <View style={ { flexDirection: 'row', marginTop: 15, alignItems: 'center' } }>
                        <MaterialCommunityIcons
                            name="menu"
                            size={ 28 }
                            color={ 'white' }
                            onPress={ () => props.navigation.closeDrawer() }
                            title="Menu"
                        />
                        <View style={ { marginLeft: 15, flexDirection: 'column' } }>
                            <Image source={ require( '../../assets/liteflix-logo.png' ) } />
                        </View>
                    </View>

                    <Drawer.Section style={ styles.usernameWrapperStyle }>
                        <Avatar.Image
                            source={ require( '../../assets/Oval2.png' ) }
                            size={ 25 }
                        />
                        <View style={ { marginLeft: 15, flexDirection: 'column' } }>
                            <Text style={ styles.usernameStyle }>Alan Casal</Text>
                        </View>
                    </Drawer.Section>

                    <Drawer.Section style={ styles.drawerSectionStyle1 }>
                        { userOptions() }
                    </Drawer.Section>
                    
                    <Drawer.Section style={ styles.drawerSectionStyle2 }>
                        { appSections() }

                        <TouchableOpacity style={ styles.agregarBtnStyle }>
                            <MaterialCommunityIcons
                                name="plus"
                                size={ 28 }
                                color={ 'white' }
                                title="add"
                            />
                            <Text style={ {
                                ...styles.itemTextStyle2,
                                marginLeft: 8,
                            } } >Agregar Película</Text>
                        </TouchableOpacity>

                        <View style={ styles.drawerItemStyle2 }>
                            <TouchableOpacity>
                                <Text style={ {
                                    ...styles.itemTextStyle1,
                                    fontFamily: 'Montserrat_700Bold',
                                } } >Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create( {
    drawerContentStyle: {
        flex: 1,
        paddingHorizontal: 20,
    },
    logoStyle: {
        fontSize: 32,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#FF0000'
    },
    usernameWrapperStyle: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#222222',
        padding: 6,
        borderRadius: 18,
    },
    usernameStyle: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        marginTop: 3,
        color: '#FFF',
        lineHeight: 15
    },
    drawerSectionStyle1: {
        marginTop: 20,
    },
    drawerItemStyle1: {
        color: '#FFF',
        borderBottomColor: '#222222',
        borderBottomWidth: 1,
        paddingBottom: 7,
        marginBottom: 6,
    },
    itemTextStyle1: {
        color: '#FFF',
        fontFamily: 'Montserrat_400Regular',
        textTransform: 'capitalize',
        fontSize: 12,
        lineHeight: 15,
    },
    itemTextStyle2: {
        color: '#FFF',
        fontFamily: 'Montserrat_400Regular',
        textTransform: 'capitalize',
        fontSize: 14,
        lineHeight: 17,
    },
    drawerSectionStyle2: {
        marginTop: 20
    },
    drawerItemStyle2: {
        marginBottom: 13,
        color: '#FFF',
    },
    novedadesOpacityStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeStyle: {
        position: 'relative',
        bottom: 10,
        right: 8,
    },
    agregarBtnStyle: {
        height: 40,
        backgroundColor: '#FF0000',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 27,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingLeft: 11
    }
} );

export default DrawerContent;
