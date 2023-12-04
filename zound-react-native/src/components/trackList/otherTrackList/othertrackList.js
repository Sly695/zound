import React from 'react';
import { List } from 'react-native-paper'

const OtherTrackList = ({ song, showModal, i }) => {
    return (
        <List.Item
            key={i}
            title={song.artist}
            description={song.song}
            left={props => <List.Icon {...props} icon="album" />}
            right={props => <List.Icon {...props} icon="equalizer" />}
        />
    )
}

export default OtherTrackList