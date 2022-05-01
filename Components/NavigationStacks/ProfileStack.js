import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Profile';
import EditProfile from '../EditProfile';
import Login from '../Login';

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation, route }) => {
    return(
            <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
    );
};

export default ProfileStack;