import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from "@expo/vector-icons/Ionicons";
import Search from '../Search';
import ProfileStack from './ProfileStack';
// import Conversations from '../Conversations';
import MessageStack from './MessageStack';
import Brandmark from '../../img/logo_brandmark.svg';
import MessagesIcon from '../../img/icon_messages.svg';
import ProfileIcon from '../../img/icon_profile.svg';
import colors from '../../styles/theme';

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

const BottomTabNavigator = ({ navigation, route }) => {
    return(
        <NavigationContainer independent={true}>
            <BottomTab.Navigator
                initialRouteName='Search'
                screenOptions={({ route }) => ({
                    headerShown: true,
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
                        } else if (route.name === "Chat") {
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
                            <TouchableOpacity>
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
                <BottomTab.Screen name="Chat"
                    component={MessageStack}
                    options={{
                        headerTintColor: '#75d2ff',
                        unmountOnBlur: true
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );

}

export default BottomTabNavigator;