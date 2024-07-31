import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AccountPage from '../../pages/accountPage';
import PlayingPage from '../../pages/playingPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ({ modalAuth, setModalAuth }) => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;


                    if (route.name === 'Liste') {
                        iconName = 'list';
                    } else if (route.name === 'Compte') {
                        iconName = 'person-outline';
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
            <Tab.Screen name="Liste" modalAuth={modalAuth} setModalAuth={setModalAuth} component={PlayingPage} />
            <Tab.Screen name="Compte" component={AccountPage} />
        </Tab.Navigator>
    );




}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
    }

})

export default TabNav;