import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserTrackList = ({ showModal, setSongPlaying }) => {

    const [userTrack, setUserTrack] = useState();

    useEffect(() => {
        console.log('Effect is running');
        getCurrentlyPlaying();
    }, [/* dependencies */]);
    

    async function getCurrentlyPlaying() {

        try {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const refreshToken = await AsyncStorage.getItem('refreshToken')

            if (accessToken && refreshToken) {
                const rawResponse = await fetch(`http://192.168.1.17:3000/getCurrentlyPlaying?access_token=${accessToken}&refresh_token=${refreshToken}`);
                const response = await rawResponse.json()

                if (response.status === 200) {
                    setSongPlaying(true)
                    setUserTrack(response)
                } else if (response.status === 401) {
                    const rawResponse = await fetch(`http://192.168.1.17:3000/refresh_token?refresh_token=${refreshToken}`);
                    const response = await rawResponse.json()
                    await AsyncStorage.setItem('accessToken', response.access_token)
                    await AsyncStorage.setItem('refreshToken', response.refresh_token)
                } else {
                    console.log(response)
                }
            }


        } catch (error) {
            console.log(error)
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
                    onPress={() => showModal(userTrack)}
                />
            }
        </>
    )
}

export default UserTrackList;