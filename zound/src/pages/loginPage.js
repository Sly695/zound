import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ZoundLogoSvg from '../../assets/zound.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomePage = (props) => {
    useEffect( async () => {
        const access_token = await AsyncStorage.getItem('accessToken')

        console.log(access_token)
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", justifyContent: 'center', height: '70%' }}>
                <Text>Va plus vite que la musique avec</Text>
                <ZoundLogoSvg />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AuthPage')}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => props.navigation.navigate('AuthPage')}>
                    <Text style={styles.buttonText2}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#C9F701', // Change the color as needed
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    button2: {
        backgroundColor: 'transparent', // Change the color as needed
        padding: 10,
        margin: 10,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black', // Change the text color as needed
        fontSize: 16,
    },
    buttonText2: {
        color: 'black', // Change the text color as needed
        fontSize: 16,
    },
});

export default HomePage