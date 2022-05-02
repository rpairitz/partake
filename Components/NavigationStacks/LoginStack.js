import React from 'react';
import Login from '../Login';
import Register from '../Register';
import CreateProfile from '../CreateProfile';
import AddHobby from '../AddHobby';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
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
    );
};

export default LoginStack;