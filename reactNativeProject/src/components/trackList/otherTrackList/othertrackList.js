import React from 'react';
import Icon from 'react-native-ionicons';
import {List} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtherTrackList = ({song, showModal, i}) => {
  return (
    <List.Item
      key={i}
      title={song.artist}
      description={song.song}
      left={props => <List.Icon {...props} icon="album" />}
      right={props => <List.Icon {...props} icon="equalizer" />}
    />
  );
};

export default OtherTrackList;
