import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/loginPage';
import TabNav from './src/components/tabNav/tabNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthPage from "./src/pages/authPage";
import { BleManager } from "react-native-ble-plx";

const Stack = createStackNavigator();


export default function App() {

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ height: "100%", width: "100%" }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="LoginPage" component={LoginPage} />
              <Stack.Screen name="AuthPage" component={AuthPage} />
              <Stack.Screen name="TabNav" component={TabNav} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );


}

