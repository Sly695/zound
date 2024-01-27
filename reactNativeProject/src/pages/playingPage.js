import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {USER_LIST} from '../constants/tracks';
import TrackBottomSheet from '../components/bottomSheet/trackBottomSheet/trackBottomSheet';
import OtherTrackList from '../components/trackList/otherTrackList/othertrackList';
import UserTrackList from '../components/trackList/userTrackList/userTrackList';
import ZoundLogo from '../../assets/zound.svg'


const PlayingPage = () => {
  const [selectSong, setSelectSong] = useState('');
  const [songPlaying, setSongPlaying] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const trackBottomSheetRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const showModal = async userTrack => {
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
        <View style={styles.header}><ZoundLogo /></View>
        <View style={styles.section}>
          <View style={styles.trackList}>
            {USER_LIST.map((song, i) => {
              return <OtherTrackList song={song} key={i} />;
            })}
          </View>
          <TrackBottomSheet
            selectSong={selectSong}
            trackBottomSheetRef={trackBottomSheetRef}
          />
          <View
            style={[
              styles.trackUser,
              // eslint-disable-next-line react-native/no-inline-styles
              {display: songPlaying ? 'block' : 'none'},
            ]}>
            <UserTrackList
              showModal={showModal}
              refreshing={refreshing}
              setSongPlaying={setSongPlaying}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  header: {
    height: '20%',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  section: {
    height: '80%',
    width: '100%',
    zIndex: '1',
    bottom: 0,
    justifyContent: "space-between"
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  trackList: {

  },
  trackUser: {
    backgroundColor: '#C9F701',
    display: 'flex',
    bottom: "0px",
  },
});

export default PlayingPage;
