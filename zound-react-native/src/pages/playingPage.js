import React, { useRef, useState, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import { USER_LIST } from '../constantes/tracks';
import TrackBottomSheet from '../components/bottomSheet/trackBottomSheet/trackBottomSheet';
import OtherTrackList from '../components/trackList/otherTrackList/othertrackList';
import UserTrackList from '../components/trackList/userTrackList/userTrackList';
import ZoundLogoSvg from '../../assets/zound.svg'

const PlayingPage = () => {

    const [selectSong, setSelectSong] = useState("");
    const [songPlaying, setSongPlaying] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const trackBottomSheetRef = useRef(null);

    // Useful ? 
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    //Display trackBottomSheet and transfer data song to him.
    const showModal = async (userTrack) => {
        setSelectSong(userTrack);
        await trackBottomSheetRef.current?.present();
        await trackBottomSheetRef.current.present();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.header}>
                    <ZoundLogoSvg />
                </View>
                <View style={styles.section}>
                    {/* Songs playing by near users */}
                    <View style={styles.trackList}>
                        {
                            USER_LIST.map((song, i) => {
                                return (
                                    <OtherTrackList song={song} key={i} showModal={showModal} />
                                )
                            })
                        }
                    </View>
                    {/* The trackbottomsheet display by cliking UserTrackList Component*/}
                    <TrackBottomSheet selectSong={selectSong} trackBottomSheetRef={trackBottomSheetRef} />
                    {/* Song playing by the main user */}
                    <View style={[styles.trackUser, { display: songPlaying ? "block" : "none" }]}>
                        <UserTrackList showModal={showModal} refreshing={refreshing} setSongPlaying={setSongPlaying} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
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
        display: "flex",
        bottom: -10,
    },
});

export default PlayingPage