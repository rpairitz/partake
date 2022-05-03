import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forums from '../Forums';
import HobbyPosts from '../HobbyPosts';

const Stack = createNativeStackNavigator();

const ForumStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login'
            screenOptions={{
                headerShown: false,
                animation: 'none',
            }}
        >
            <Stack.Screen name="Forums" component={Forums} />
            <Stack.Screen name="HobbyPosts" component={HobbyPosts} />
        </Stack.Navigator>
    );
};

export default ForumStack;