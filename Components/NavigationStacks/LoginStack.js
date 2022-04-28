import React from 'react';
import Login from '../Login';
import Register from '../Register';
import CreateProfile from '../CreateProfile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const LoginStack = ({ navigation, route }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="CreateProfile" component={CreateProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default LoginStack;