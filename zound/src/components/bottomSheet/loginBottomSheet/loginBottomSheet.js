import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginBottomSheet = ({ loginBottomSheetRef }) => {

  const snapPoints = useMemo(() => ["90%"]);
  const navigation = useNavigation();

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    )
  }, []);

  async function handleNavigationStateChange(navState) {
    const fetchAPI = navState.url
    const rawResponse = await fetch(fetchAPI);
    const response = await rawResponse.json();
    if (response) {
      await AsyncStorage.setItem('spotifyUser', JSON.stringify(response))
      await AsyncStorage.setItem('accessToken', response.access_token)
      await AsyncStorage.setItem('refreshToken', response.refresh_token)
      navigation.navigate('TabNav')

    }
  };



  return (
    <View style={styles.BottomSheetContainer} >
      <BottomSheetModal
        ref={loginBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: '#000'
        }}
      >
        <SafeAreaView style={styles.container} >
          <WebView
            incognito={true}
            source={{ uri: 'http://192.168.1.17:3000/login' }}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState
            useWebKit={true}
            style={styles.webview}
          /* Does not store any data within the lifetime of the WebView. */
          ><Text>OUI</Text></WebView>
        </SafeAreaView>
      </BottomSheetModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  webview: {
    backgroundColor: "#000",
  },
  BottomSheetContainer: {
    flex: 1,
    padding: 24,
    position: 'absolute',
    bottom: 0,
    width: "100%"
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    boxSizing: 'border-box',
    backgroundColor: "#FFF",
  }
});

export default LoginBottomSheet