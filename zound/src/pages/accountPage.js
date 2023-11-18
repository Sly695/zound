import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image } from "react-native"
import { Avatar, List } from 'react-native-paper'


const AccountPage = () => {

    const [spotifyUser, setSpotifyUser] = useState()

    useEffect(() => {
        getSpotifyUser()
    }, [])

    async function getSpotifyUser() {
        const userSpotify = await AsyncStorage.getItem("spotifyUser")
        const userSpotifyParsed = await JSON.parse(userSpotify)
        setSpotifyUser(userSpotifyParsed.userData)
    }

    console.log({ spotifyUser: spotifyUser })

    return (
        <>{spotifyUser &&
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/zound.png')} />
                </View>
                <View style={styles.section}>
                    <View style={styles.profile}>
                        {
                            spotifyUser.images.length >= 1 ? <Avatar.Image style={styles.avatar} size={80} source={{ uri: spotifyUser.images[1].url }} /> : <Avatar.Image style={styles.avatar} size={80} />
                        }
                        <Text style={styles.display_name}>{spotifyUser.display_name}</Text>
                    </View>
                    <List.Item
                        title="Followers"
                        description={spotifyUser.followers.total}
                        left={props => <List.Icon {...props} icon="album" />}
                        right={props => <List.Icon {...props} icon="equalizer" />}
                    />
                </View>
            </View>
        }
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
    }


});

export default AccountPage;