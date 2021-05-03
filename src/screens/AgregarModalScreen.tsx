
import React, { useState } from "react";
import { 
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import RNPickerSelect from "react-native-picker-select";

import { Button } from 'react-native-paper';

import { useMisPeliculasContext } from '../contexts/MisPeliculasContext';

import ProgressBar from '../components/ProgressBar';

enum ScreenContentOpts {
    alert           = 'alert',
    form            = 'form',
    congratulations = 'congratulations'
}

const AgregarModalScreen = ( { navigation } ) => {
    const [ nombre, setNombre ]                       = useState( '' ),
          [ imagen, setImagen ]                       = useState( '' ),
          [ categoria, setCategoria ]                 = useState( '' ),
          [ imagenSubidaOk, setImagenimagenSubidaOk ] = useState( false ),
          [ screenStatus, setScreenStatus ]           = useState( ScreenContentOpts.form );

    const [ nombreInputFocused, setNombreInputFocused ] = useState( false );

    const subirPeliculaBtnDisabled = nombre === '' || imagen === '' || categoria === '' || !imagenSubidaOk;

    const { misPeliculasState, setMisPeliculasState } = useMisPeliculasContext();

    const categoriasList = [
        { label: 'Drama', value: 'Drama'},
        { label: 'Acción', value: 'Acción'},
        { label: 'Ciencia Ficción', value: 'Ciencia Ficción'},
        { label: 'Aventura', value: 'Aventura'},
        { label: 'Animé', value: 'Animé'},
        { label: 'Fantasía', value: 'Fantasía'},
        { label: 'Independiente', value: 'Independiente'},
    ];

    const handleChooseImage = async () => {
        if ( Platform.OS === 'web' ) return;

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if ( status !== 'granted' )
            return setScreenStatus( ScreenContentOpts.alert );

        let result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 1,
        } );

        if ( !result.cancelled )
            setImagen( result.uri );
    };

    const handleSubirPelicula = () => {
        setMisPeliculasState( [ ...misPeliculasState, { nombre, imagen, categoria } ] );
        setScreenStatus( ScreenContentOpts.congratulations );
    };

    const resetContent = () => {
        setNombre( '' );
        setImagen( '' );
        setCategoria( '' );
    };

    const cancelarSubida = () => {
        setImagen( '' );
        setImagenimagenSubidaOk( false );
    }

    const PermissionAlertContent = (
        <View style={ styles.permissionModalContainerStyle }>
            <Text style={ styles.permissionModalTextStyle } >Liteflix necesita su permiso para acceder a su galería de imágenes</Text>

            <Button
                color="#FFF"
                contentStyle={ {
                    height: 48,
                    backgroundColor: '#0076FF',
                    borderRadius: 35,
                    marginTop: 35,
                } }
                onPress={ () => setScreenStatus( ScreenContentOpts.form ) }
            >
                <Text style={ styles.actionBtnStyle } > Cerrar </Text>
            </Button>
        </View>
    );

    const AgregarPeliculaContent = (
        <>
            { imagen !== '' ?
            <ProgressBar
                onCancelar={ cancelarSubida }
                onComplete={ () => setImagenimagenSubidaOk( true ) }
            />

            : <Button
                icon={ ( { color } ) => (
                    <MaterialCommunityIcons
                        name="paperclip"
                        size={ 28 }
                        color={ color }
                        style={ { transform: [ { rotate: '135deg' }, { rotateY: '180deg' } ] } }
                    />
                ) }
                color="#0076FF"
                contentStyle={ styles.agregarBtnContentStyle }
                style={ styles.agregarBtnStyle }
                onPress={ handleChooseImage }
            >
                <Text style={ styles.agregarBtnTextStyle } >
                    Agregar Archivo
                </Text>
            </Button>}

            <View style={ { marginBottom: 27 } } >
                <Text style={ styles.label1Style }>NOMBRE DE LA PELÍCULA</Text>

                <TextInput
                    value={ nombre }
                    onChangeText={ nombre => setNombre( nombre ) }
                    onFocus={ () => setNombreInputFocused( true ) }
                    onBlur={ () => setNombreInputFocused( false ) }
                    style={ {
                        ...styles.textInputStyle,
                        borderBottomColor: nombreInputFocused ? '#0076FF' : '#000'
                    } }
                />
            </View>

            <View style={ { marginBottom: 42, borderBottomWidth: 1 } } >
                <Text style={ styles.label1Style }>CATEGORÍA</Text>

                <RNPickerSelect
                    placeholder={ { label: 'Seleccionar Categoría', value: '' } }
                    items={ categoriasList }
                    onValueChange={ ( categoria ) => setCategoria( categoria ) }
                    style={ pickerSelectStyles }
                />
            </View>

            <Button
                disabled={ subirPeliculaBtnDisabled }
                contentStyle={ {
                    height: 48,
                } }
                style={ {
                    backgroundColor: subirPeliculaBtnDisabled ? '#DEDEDE' : '#000',
                    borderRadius: 35,
                } }
                onPress={ handleSubirPelicula }
            >
                <Text style={ styles.whiteTextStyle } >
                    Subir Película
                </Text>
            </Button>
        </>
    );

    const FelicitacionesContent = (
        <View style={ styles.permissionModalContainerStyle }>
            <Text style={ styles.liteflixLogoStyle } >liteflix</Text>
            
            <Text style={ styles.felicitacionesTextStyle } >¡Felicitaciones!</Text>
            
            <Text style={ styles.felicitacionesDescTextStyle } >
                <Text style={ styles.felicitacionesBoldTextStyle }>{ nombre } </Text>
                fue correctamente subido a la categoría
                <Text style={ styles.felicitacionesBoldTextStyle }> { categoria }</Text>
            </Text>

            <Button
                color="#FFF"
                contentStyle={ {
                    width: 140,
                    height: 48,
                    backgroundColor: '#000',
                    borderRadius: 35,
                    marginTop: 35,
                } }
                onPress={ () => {
                    setScreenStatus( ScreenContentOpts.form );
                    resetContent();
                } }
            >
                <Text style={ styles.actionBtnStyle } > Cerrar </Text>
            </Button>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <View style={ styles.containerStyle } >
                <View style={ {
                    ...styles.modalContainer,
                    backgroundColor: screenStatus === ScreenContentOpts.congratulations ? '#7ED321' : '#FFF'
                } } >
                    <MaterialCommunityIcons
                        name="close"
                        size={ 18 }
                        color={ 'black' }
                        onPress={ () => navigation.goBack() }
                        title="close"
                        style={ styles.closeBtnStyle }
                    />
                    { screenStatus === ScreenContentOpts.alert ? PermissionAlertContent :
                        screenStatus === ScreenContentOpts.form ? AgregarPeliculaContent :
                        screenStatus === ScreenContentOpts.congratulations ? FelicitacionesContent :
                        null }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create( {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: '#000'
    },
    modalContainer: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 47,
        paddingBottom: 48
    },
    closeBtnStyle: {
        position: 'absolute',
        top: 16,
        right: 16
    },
    agregarBtnContentStyle: {
        height: 64,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9B9B9B'
    },
    agregarBtnStyle: {
        backgroundColor: '#FFF',
        marginTop: 48,
        marginBottom: 39
    },
    agregarBtnTextStyle: {
        fontSize: 14,
        lineHeight: 17,
        color: '#0076FF',
        fontFamily: 'Montserrat_800ExtraBold',
        textTransform: 'capitalize'
    },
    label1Style: {
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 4,
        color: '#9B9B9B',
        fontFamily: 'Montserrat_400Regular',
        textTransform: 'uppercase'
    },
    textInputStyle: {
        borderWidth: 0,
        borderBottomWidth: 1,
        marginTop: 16,
    },
    pickerStyle: {
        height: 30,
        marginTop: 10,
        marginLeft: 0,
        paddingLeft: 0
    },
    permissionModalContainerStyle: {
        paddingTop: 47,
    },
    permissionModalTextStyle: {
        textAlign: 'center',
    },
    whiteTextStyle: {
        color: '#FFF',
        textTransform: 'capitalize',
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 17
    },
    liteflixLogoStyle: {
        fontSize: 28,
        color: '#FF0000',
        fontWeight: 'bold'
    },
    felicitacionesTextStyle: {
        marginTop: 41,
        fontSize: 28,
        color: '#FFF',
        fontFamily: 'Montserrat_500Medium',
        lineHeight: 34
    },
    felicitacionesDescTextStyle: {
        fontFamily: 'Montserrat_400Regular',
        color: '#FFF',
        fontSize: 18
    },
    felicitacionesBoldTextStyle: {
        fontFamily: 'Montserrat_700Bold',
    },
    actionBtnStyle: {
        color: '#FFF',
        textTransform: 'capitalize',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        lineHeight: 17
    }
} );

const pickerSelectStyles = StyleSheet.create( {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        height: 30,
        marginTop: 16,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        height: 30,
        marginTop: 16,
    },
} );

export default AgregarModalScreen;
