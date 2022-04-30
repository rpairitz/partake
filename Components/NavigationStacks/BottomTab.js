import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from '../Search';
import ProfileStack from './ProfileStack';
import Conversations from '../Conversations';
import MessageStack from './MessageStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login} from "../Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
const Stack = createNativeStackNavigator();


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
                        headerRight: () => (
                            <TouchableOpacity>
                                <Text onPress={() => {AsyncStorage.setItem('partakeCredentials', "")}} style={styles.container}>Log Out</Text>
                            </TouchableOpacity>
                        )
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
                        headerTintColor: '#75d2ff'
                    }}
                />
               
            </BottomTab.Navigator>
        </NavigationContainer>
    );

}

export default BottomTabNavigator;