import React, { useRef, useState } from 'react'
import { View, StyleSheet, Image, Linking } from 'react-native'
import { USER_LIST } from '../constants/tracks';
import TrackBottomSheet from '../components/bottomSheet/trackBottomSheet/trackBottomSheet';
import LoginBottomSheet from '../components/bottomSheet/loginBottomSheet/loginBottomSheet';
import OtherTrackList from '../components/trackList/otherTrackList/othertrackList';
import UserTrackList from '../components/trackList/userTrackList/userTrackList';
import ZoundLogoSvg from '../../assets/zound.svg'


const PlayingPage = () => {


    const [selectSong, setSelectSong] = useState("");
    const [songPlaying, setSongPlaying] = useState(false)
    const trackBottomSheetRef = useRef(null);
    const loginBottomSheetRef = useRef(null);



    const showModal = async (userTrack) => {
        setSelectSong(userTrack);
        await trackBottomSheetRef.current?.present();
        await trackBottomSheetRef.current.present();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ZoundLogoSvg />
            </View>
            <View style={styles.section}>
                <View style={styles.trackList}>
                    {

                        USER_LIST.map((song, i) => {
                            return (
                                <OtherTrackList song={song} key={i} />
                            )
                        })

                    }
                </View>
                <TrackBottomSheet selectSong={selectSong} trackBottomSheetRef={trackBottomSheetRef} />
                <View style={[styles.trackUser, { display: songPlaying ? "block" : "none" }]}>
                    <UserTrackList showModal={showModal} setSongPlaying={setSongPlaying} selectSong={selectSong} />
                </View>
            </View>
            <LoginBottomSheet loginBottomSheetRef={loginBottomSheetRef} />
        </View>


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
        zIndex: '1',
    },
    text: {
        textAlign: "center",
        color: 'white'
    },
    trackList: {
        height: "85%",
        zIndex: '1',
    },
    trackUser: {
        backgroundColor: '#C9F701',
        height: "15%",
    },
    button: {
        backgroundColor: '#C9F701', // Change the color as needed
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 50,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonwrap: {
        flexDirection: 'row',
        height: "10%",
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
});

export default PlayingPage