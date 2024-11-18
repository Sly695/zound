import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AccountPage from '../../pages/accountPage';
import PlayingPage from '../../pages/playingPage';
import { routes } from '../../constantes/routes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ({ modalAuth, setModalAuth }) => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;

                    switch (route.name) {
                        case routes.MUSIC :
                        iconName = 'musical-note-outline';
                        break;
                        case routes.ACCOUNT :
                        iconName = 'person-outline';
                        default:
                            break;
                    }

                    return <Ionicons name={iconName} size={25} color={color} />;
                },
            })}
            tabBarOptions={{
                style: {
                    padding: 10,
                    backgroundColor: 'black',
                },
                activeTintColor: '#C9F701',
                inactiveTintColor: '#dfe6e9',
            }}
        >
            {/* <Tab.Screen name="Chat" component={ChatPage} /> */}
            <Tab.Screen name="Music" modalAuth={modalAuth} setModalAuth={setModalAuth} component={PlayingPage} />
            <Tab.Screen name="Account" component={AccountPage} />
        </Tab.Navigator>
    );




}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
    }

})

export default TabNav;