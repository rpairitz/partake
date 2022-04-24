import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import EditProfile from './EditProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation, route }) => {
    return(
            <Stack.Navigator initialRouteName='Profile' screenOptions={{
            headerShown: false,
            }}
            >
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
    );
};

export default ProfileStack;