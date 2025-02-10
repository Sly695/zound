import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserTrackList = ({ showModal, setSongPlaying, refreshing }) => {

    const [userTrack, setUserTrack] = useState();

    useEffect( () => {
        getCurrentlyPlaying();
    }, [refreshing]);


    async function getCurrentlyPlaying() {

        try {
            // Use token on asyncStorage and used it to call /getCurrentlyPlayingRoute
            const accessToken = await AsyncStorage.getItem('accessToken')
            const refreshToken = await AsyncStorage.getItem('refreshToken')

            if (accessToken && refreshToken) {
                const rawResponse = await fetch(`http://localhost:3000/getCurrentlyPlaying?access_token=${accessToken}&refresh_token=${refreshToken}`);
                const response = await rawResponse.json()

                if (response.status === 200) {
                    setSongPlaying(true)
                    setUserTrack(response)
                } else if (response.status === 401) {
                    const rawResponse = await fetch(`http://localhost:3000/refresh_token?refresh_token=${refreshToken}`);
                    const response = await rawResponse.json()
                    await AsyncStorage.setItem('accessToken', response.access_token)
                    await AsyncStorage.setItem('refreshToken', response.refresh_token)
                } else if(response.status === 304){
                    console.error(response)
                }
            }

        } catch ({error, status, body}) {
            console.log({"error": error, "status": status, "body": body})
        }
    }



    return (
        <>
            {userTrack && userTrack.song && userTrack.song.item &&
                <List.Item
                    title={userTrack.song.item.name}
                    description={userTrack.song.item.artists[0].name}
                    left={props => <List.Icon {...props} icon="album" />}
                    right={props => <List.Icon {...props} icon="equalizer" />}
                    onPress={() => {
                        showModal(userTrack)
                    }}
                />
            }
        </>
    )
}

export default UserTrackList;