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
import { MultipeerConnectivity } from 'react-native-multipeer';

const PlayingPage = () => {


    const [selectSong, setSelectSong] = useState("");
    const [songPlaying, setSongPlaying] = useState(false)
    const [available, setAvailable] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const trackBottomSheetRef = useRef(null);
    const loginBottomSheetRef = useRef(null);

    const invite = (peer) => {
        MultipeerConnectivity.invite(peer.id);
    };

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

    useEffect(() => {
        const onChange = () => {
            setDataSource(getStateFromSources().dataSource);
        };

        MultipeerConnectivity.on('peerFound', onChange);
        MultipeerConnectivity.on('peerLost', onChange);
        MultipeerConnectivity.on('invite', (event) => {
            // Automatically accept invitations
            MultipeerConnectivity.rsvp(event.invite.id, true);
        });
        MultipeerConnectivity.on('peerConnected', (event) => {
            alert(`${event.peer.id} connected!`);
        });

        MultipeerConnectivity.advertise('channel1', {
            name: `User-${Math.round(1e6 * Math.random())}`,
        });
        MultipeerConnectivity.browse('channel1');
        

        return () => {
            MultipeerConnectivity.removeAllListeners();
        };
    }, []);


    const showModal = async (userTrack) => {
        setSelectSong(userTrack);
        await trackBottomSheetRef.current?.present();
        await trackBottomSheetRef.current.present();
    };

    const getStateFromSources = () => {
        return {
            dataSource: MultipeerConnectivity.getAllPeers(),
        };
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
                        <UserTrackList showModal={showModal} refreshing={refreshing} setSongPlaying={setSongPlaying} />
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
});

export default PlayingPage