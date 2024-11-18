import React from 'react';
import { List } from 'react-native-paper'

const OtherTrackList = ({ song, showModal, i }) => {
    return (
        <List.Item
            key={i}
            title={song.song.item.name || "Unknown Title"}
            description={song.song.item.artists[0].name || "Unknown Artist"}
            left={props => <List.Icon {...props} icon="album" />}
            right={props => <List.Icon {...props} icon="equalizer" />}
            onPress={() => showModal(song)}
        />
    )
}

export default OtherTrackList