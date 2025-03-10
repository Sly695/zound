import React, { useCallback, useMemo, useEffect, useRef } from 'react';
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

  //onNavigationStageChange = capte les changements d'état dans la navigation ex: chargement d'une nouvelle URL ou chargement d'une page.
  async function handleNavigationStateChange(navState) {
    const fetchAPI = navState.url
    const rawResponse = await fetch(fetchAPI);
    const response = await rawResponse.json();
    if (response) {
      await AsyncStorage.setItem('spotifyUser', JSON.stringify(response))
      await AsyncStorage.setItem('accessToken', response.access_token)
      await AsyncStorage.setItem('refreshToken', response.refresh_token)
      navigation.navigate('TabNav')
      loginBottomSheetRef.current.close();
    }
  };

  return (
    <View style={styles.BottomSheetContainer} >
      <BottomSheetModal
        ref={loginBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: '#121212',
        }}
      >
        <SafeAreaView style={styles.container} >
          {/* Call to /login to have token and stock him on AsyncStorage  */}
          <WebView
            source={{ uri: 'http://localhost:3000/login' }}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState
            useWebKit={true}
            incognito={true}
            // Tips for encountering white background
            style={{ flex: 1, backgroundColor: 'transparent' }}
          /* Does not store any data within the lifetime of the WebView. */
          />
        </SafeAreaView>
      </BottomSheetModal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  webview: {
    backgroundColor: "#000",
  },
  BottomSheetContainer: {
    flex: 1,
    padding: 24,
    position: 'absolute',
    bottom: 0,
    width: "100%",
    backgroundColor: "#121212",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    boxSizing: 'border-box',
    backgroundColor: "#000",
  }
});

export default LoginBottomSheet