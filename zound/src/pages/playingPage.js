import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import { USER_LIST } from '../constants/tracks';
import TrackBottomSheet from '../components/bottomSheet/trackBottomSheet/trackBottomSheet';
import LoginBottomSheet from '../components/bottomSheet/loginBottomSheet/loginBottomSheet';
import OtherTrackList from '../components/trackList/otherTrackList/othertrackList';
import UserTrackList from '../components/trackList/userTrackList/userTrackList';
import ZoundLogoSvg from '../../assets/zound.svg'
import scanDevices from '../utils/useBluetooth'
import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';

const PlayingPage = () => {


    const [selectSong, setSelectSong] = useState("");
    const [songPlaying, setSongPlaying] = useState(false)
    const [available, setAvailable] = useState()
    const [refreshing, setRefreshing] = useState(false);

    const trackBottomSheetRef = useRef(null);
    const loginBottomSheetRef = useRef(null);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    useEffect(() => {
        const scanDevices = async () => {
            try {
                const available = await RNBluetoothClassic.list();
                setAvailable({ available })
            } catch (err) {
                // Handle accordingly
            }
        };

        scanDevices()
    }, [])


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
                        <UserTrackList showModal={showModal} refreshing={refreshing} setSongPlaying={setSongPlaying} selectSong={selectSong} />
                    </View>
                </View>
                <LoginBottomSheet loginBottomSheetRef={loginBottomSheetRef} />
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