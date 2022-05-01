import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Search from '../Search';
import ProfileStack from './ProfileStack';
import MessageStack from './MessageStack';
import Brandmark from '../../img/logo_brandmark.svg';
import MessagesIcon from '../../img/icon_messages.svg';
import ProfileIcon from '../../img/icon_profile.svg';
import colors from '../../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
      color: "#75d2ff",
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: 'bold',
      paddingRight: 15
    },
});

const BottomTab = createBottomTabNavigator();
//const Stack = createNativeStackNavigator();


const BottomTabNavigator = ({ navigation, route }) => {

    const logOut = () => {
        AsyncStorage.setItem("partakeCredentials", '');
        navigation.navigate('Login');
    };

    return(
            <BottomTab.Navigator
                initialRouteName='Search'
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarStyle: {position: 'absolute', height: 89},
                    tabBarIcon: ({ focused }) => {
                        if (route.name === "Search") {
                            return (
                                focused ? 
                                <Brandmark width={36.16} height={34} 
                                    color={colors.logoActive} gradStart={colors.iceBlue} gradEnd={colors.orchid}/>
                                :
                                <Brandmark width={36.16} height={34} 
                                    color={colors.grayInactive} gradStart={colors.grayInactive} gradEnd={colors.grayInactive}/>
                            );
                        } else if (route.name === "Messages") {
                            return (
                                focused ?
                                <MessagesIcon width={34} height={34}
                                    color={colors.grayActive}/>
                                :
                                <MessagesIcon width={34} height={34}
                                    color={colors.grayInactive}/>
                            );
                        } else if (route.name === "Profile") {
                            return (
                                focused ?
                                <ProfileIcon width={34} height={34}
                                    color={colors.grayActive}/>
                                :
                                <ProfileIcon width={34} height={34}
                                    color={colors.grayInactive}/>
                            );
                        }
                    },
                    tabBarActiveTintColor: "#75d2ff",
                    tabBarInactiveTintColor: "#75d2ff",
                    tabBarShowLabel: false,
                })}
            >
                <BottomTab.Screen name="Profile"
                    component={ProfileStack}
                    options={{
                        headerTintColor: '#75d2ff',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {logOut()}}>
                                <Text style={styles.container}>Log Out</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <BottomTab.Screen name="Search"
                    component={Search}
                    options={{
                        headerTintColor: '#75d2ff'
                    }}
                />
                <BottomTab.Screen name="Messages"
                    component={MessageStack}
                    options={{
                        headerTintColor: '#75d2ff',
                        unmountOnBlur: true
                    }}
                />
               
            </BottomTab.Navigator>
    );

}

export default BottomTabNavigator;