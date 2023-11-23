import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, TouchableOpacity, use } from "react-native"
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoginBottomSheet from '../components/bottomSheet/loginBottomSheet/loginBottomSheet';
import ZoundLogoSvg from '../../assets/zound.svg'

const AuthPage = () => {

    const loginBottomSheetRef = useRef(null);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback( async () => {

            presentBottomSheet()

            return () => {
                // Your cleanup logic
                console.log('Screen is unfocused');
            };
        }, [])
    );

    const presentBottomSheet = async () => {
        const access_token = await AsyncStorage.getItem('accessToken');
        console.log(access_token)
        if (access_token === null) {
            loginBottomSheetRef.current?.present();
        } else {
            navigation.navigate('TabNav')
        }
    }

    return (
        <>

            <View style={styles.container}>
                <View style={styles.header}>
                    <ZoundLogoSvg />
                </View>
                <View style={styles.section}>
                    <Text>Synchroniser votre service de streaming préféré afin de profiter pleinement à notre expérience: </Text>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('AuthPage')}>
                        <Text style={styles.buttonText2} onPress={() => presentBottomSheet()}>Synchroniser</Text>
                    </TouchableOpacity>
                    <LoginBottomSheet loginBottomSheetRef={loginBottomSheetRef} />
                </View>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C9F701',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: "25%",
        justifyContent: "flex-end",
        alignContent: "center"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: "25%",
        justifyContent: "flex-end",
        alignContent: "center"
    },
    section: {
        height: "80%",
        width: '100%',
        padding: 20,
        alignItems: "center"
    },
    text: {
        textAlign: "center",
    },

    // spotify user

    profile: {
        width: '100%',
        height: 120,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        margin: 'auto',
        alignItems: "center",
    },
    display_name: {
        fontSize: 20,
        textAlign: 'center'
    },
    wrapbutton: {
        width: "100%",
        position: "absolute",
        alignItems: "center",
        bottom: 50
    },
    button: {
        backgroundColor: '#C9F701', // Change the color as needed
        fontStyle: "white",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000"
    },
    buttonText2: {
        color: '#FFF',
    },
    button2: {
        backgroundColor: '#000', // Change the color as needed
        fontStyle: "white",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        position: "absolute",
        bottom: 100,
    },


});

export default AuthPage;