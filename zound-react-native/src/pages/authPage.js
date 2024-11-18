import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, TouchableOpacity, use } from "react-native"
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoginBottomSheet from '../components/bottomSheet/loginBottomSheet/loginBottomSheet';
import ZoundLogoSvg from '../../assets/zound.svg'
import SecondaryButton from '../components/button/secondaryButton';

const AuthPage = () => {

    const loginBottomSheetRef = useRef(null);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const handlePresentBottomSheet = async () => {
                const access_token = await AsyncStorage.getItem('accessToken');
                if (access_token === null) {
                    loginBottomSheetRef.current?.present();
                } else {
                    navigation.navigate('TabNav');
                }
            };

            handlePresentBottomSheet();

            return () => {
                // Your cleanup logic
                console.log('Screen is unfocused');
            };
        }, [navigation])
    );

    // Idk what it is but maybe we'll used it 
    // const presentBottomSheet = async () => {
    //     const access_token = await AsyncStorage.getItem('accessToken');
    //     if (access_token === null) {
    //         loginBottomSheetRef.current?.present();
    //     } else {
    //         navigation.navigate('TabNav')
    //     }
    // }

    return (
        <>

            <View style={styles.container}>
                <View style={styles.header}>
                    <ZoundLogoSvg />
                </View>
                <View style={styles.section}>
                    <Text>Synchroniser votre service de streaming préféré afin de profiter pleinement à notre expérience: </Text>
                    <SecondaryButton text="Synchroniser" handleFunction={() => loginBottomSheetRef.current?.present()} />
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
        borderWidth: 1,
        borderColor: "black",
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
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 100
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
    }

});

export default AuthPage;