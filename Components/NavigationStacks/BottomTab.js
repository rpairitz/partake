import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from '../Search';
import Profile from '../Profile';
import ProfileStack from './ProfileStack';
import Chat from '../Chat';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, route }) => {
    return(
        <NavigationContainer independent={true}>
            <BottomTab.Navigator
                initialRouteName='Search'
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Search") {
                            iconName = focused ? "search" : "search-outline";
                        } else if (route.name === "Chat") {
                            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "person" : "person-outline";
                        }
                        return <Ionicons name={iconName} size={size} color="#75d2ff" />
                    },
                    tabBarActiveTintColor: "#75d2ff",
                    tabBarInactiveTintColor: "#75d2ff",
                })}
            >
                <BottomTab.Screen name="Profile"
                    component={ProfileStack}
                    options={{
                        headerTintColor: '#75d2ff',
                        /*headerLeft: () => (
                            <Ionicons name="menu-outline" size="24px" color="#75d2ff" />
                        )*/
                    }}
                />
                <BottomTab.Screen name="Search"
                    component={Search}
                    options={{
                        //title: 'partake',
                        headerTintColor: '#75d2ff'
                    }}
                />
                <BottomTab.Screen name="Chat"
                    component={Chat}
                    options={{
                        //title: 'partake',
                        headerTintColor: '#75d2ff'
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );

}

export default BottomTabNavigator;