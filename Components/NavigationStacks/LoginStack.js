import React from 'react';
import Login from '../Login';
import Register from '../Register';
import CreateProfile from '../CreateProfile';
import AddHobby from '../AddHobby';
import BottomTabNavigator from '../NavigationStacks/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='Login'
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
                }}
            >
                <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false, unmountOnBlur: true }} />
                <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
                <Stack.Screen name="Home" component={HomeStack} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ gestureEnabled: false }} />
                <Stack.Screen name="AddHobby" component={AddHobby} options={{ gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default LoginStack;