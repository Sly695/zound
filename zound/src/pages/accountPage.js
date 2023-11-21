import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Touchable, Alert } from "react-native"
import { Avatar, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import ZoundLogoSvg from '../../assets/zound.svg'



const AccountPage = ({ userLogged }) => {

    const [spotifyUser, setSpotifyUser] = useState()
    const navigation = useNavigation();

    useEffect(() => {
        getSpotifyUser()
    }, [userLogged])

    async function getSpotifyUser() {
        const userSpotify = await AsyncStorage.getItem("spotifyUser")
        const userParsed = await JSON.parse(userSpotify)
        setSpotifyUser(userParsed)
        console.log(spotifyUser)

    }

    const handleLogout = async () => {
        try {
            // Clear any user-related data or tokens
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('spotifyUser')
            setSpotifyUser("")
            // Optionally, you might want to reset some state or trigger additional actions

            // Navigate to the login or home screen
            navigation.navigate('LoginPage'); // Adjust the screen name accordingly
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'An error occurred during logout.');
        }
    };

    console.log({ userLogged: userLogged })

    return (
        <>

            <View style={styles.container}>
                <View style={styles.header}>
                    <ZoundLogoSvg />
                </View>
                <View style={styles.section}>
                    {spotifyUser && (
                        <>
                            <View style={styles.profile}>
                                {
                                    spotifyUser.userData.images.length === 0 ? <Avatar.Image style={styles.avatar} size={80} /> : <Avatar.Image style={styles.avatar} size={80} source={{ uri: spotifyUser.userData.images[1].url }} />
                                }
                                <Text style={styles.display_name}>{spotifyUser.userData.display_name}</Text>
                            </View>
                            <List.Item
                                title="Followers"
                                description={spotifyUser.followers}
                                left={props => <List.Icon {...props} icon="album" />}
                                right={props => <List.Icon {...props} icon="equalizer" />}
                            />
                        </>
                    )}
                    <View style={styles.wrapbutton}>
                        {!spotifyUser &&
                            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('AuthPage')}>
                                <Text style={styles.buttonText2}>Synchroniser</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText1}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: "25%",
        justifyContent: "flex-end",
        alignContent: "center"
    },
    section: {
        height: "80%",
        width: '100%',
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
        borderColor: "#000"
    },
    buttonText: {
        color: '#000',
    },
    buttonText2: {
        color: '#FFF',
    },


});

export default AccountPage;