import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ZoundLogoSvg from '../../assets/zound.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PrimaryButton from '../components/button/primaryButton'
import SecondaryButton from '../components/button/secondaryButton'


const HomePage = (props) => {
    
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", justifyContent: 'center', height: '70%' }}>
                <Text>Va plus vite que la musique avec</Text>
                <ZoundLogoSvg />
            </View>
            <View>
                {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AuthPage')}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity> */}
                <PrimaryButton text="Se connecter" handleFunction={() => props.navigation.navigate('AuthPage')} />
                <SecondaryButton text="S'inscrire" handleFunction={() => props.navigation.navigate('AuthPage')} />
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
});

export default HomePage