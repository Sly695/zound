import React, { useCallback, useMemo } from 'react'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Linking, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

const TrackBottomSheet = ({ selectSong, trackBottomSheetRef }) => {

    const snapPoints = useMemo(() => ["90%"]);

    const renderBackdrop = useCallback((props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        )
    }, []);

    // DeepLinking // Linking.canOpenUrl : vérification sur l'appli est installée.
    async function redirectModal(externalUrl) {
        await Linking.openURL(externalUrl);
    }

    return (
        <>
            {selectSong &&
                <View style={styles.BottomSheetScrollContainer} >
                    <BottomSheetModal
                        ref={trackBottomSheetRef}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                        backgroundStyle={{
                            backgroundColor: '#C9F701',
                        }}
                    >
                        <View style={styles.contentContainer}>
                            <Image source={{ uri: selectSong.song?.item?.album.images[0].url }} style={styles.coverModal} />
                            <View style={styles.songdetails}>
                                <Text style={styles.songartist}>{selectSong.song?.item?.artists[0].name}</Text>
                                <Text style={styles.songname}>{selectSong.song?.item?.name}</Text>
                            </View>

                            <View style={styles.buttonwrap}>
                                <TouchableOpacity style={styles.button} onPress={() => redirectModal(selectSong.song.item.uri)}>
                                    <Text style={styles.buttonText2}>Écouter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheetModal>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {

    },
    BottomSheetContainer: {
        flex: 1,
        padding: 30,
        bottom: 0,
        width: "100%",
        color: "#000",
    },
    BottomSheetScrollContainer: {

    },
    contentContainer: {
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
    },
    button: {
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
    },
    buttonText2: {
        color: '#FFF',
    },
    buttonwrap: {
        flexDirection: 'row',
        height: "10%",
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    songdetails: {
        height: '35%',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    songartist: {
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "center",
        color: "#000",
    },
    songname: {
        fontSize: 25,
        fontWeight: "normal",
        justifyContent: "center",
        color: "#000",
    },
    coverModal: {
        height: "50%",
        width: '100%',
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    song: {
        color: "black",
    },
    BottomSheetContainer: {
        flex: 1,
        padding: 24,
        position: 'absolute',
        bottom: 0,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
        backgroundColor: "#C9F701",

    },
});

export default TrackBottomSheet