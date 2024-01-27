import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import AccountPage from '../../pages/accountPage';
import PlayingPage from '../../pages/playingPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TabNav = ({ modalAuth, setModalAuth }) => {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Liste') {
            iconName = 'ios-list';
          } else if (route.name === 'Compte') {
            iconName = 'ios-person';
          }

          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#C9F701',
        inactiveTintColor: '#FFF',
      }}>
      <Tab.Screen
        name="Liste"
        modalAuth={modalAuth}
        setModalAuth={setModalAuth}
        component={PlayingPage}
      />
      <Tab.Screen name="Compte" component={AccountPage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
});

export default TabNav;
