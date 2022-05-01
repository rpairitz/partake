import React from 'react';
import Login from '../Login';
import Register from '../Register';
import CreateProfile from '../CreateProfile';
import AddHobby from '../AddHobby';
import BottomTabNavigator from '../NavigationStacks/BottomTab';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const LoginStack = ({ navigation, route }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
                <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ gestureEnabled: false }} />
                <Stack.Screen name="AddHobby" component={AddHobby} options={{ gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default LoginStack;