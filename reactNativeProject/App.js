/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

import LoginPage from './src/pages/loginPage';
import AuthPage from './src/pages/authPage';
import TabNav from './src/components/tabNav/tabNav';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <View style={{ height: '100%', width: '100%' }}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false, // This will hide the header by default
                  }}
                >
                  <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
                  <Stack.Screen options={{ headerShown: false }} name="AuthPage" component={AuthPage} />
                  <Stack.Screen options={{ headerShown: false }} name="TabNav" component={TabNav} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
    </PaperProvider>
  );
}