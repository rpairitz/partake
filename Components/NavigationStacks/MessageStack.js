import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Conversations from '../Conversations';
import Chat from '../Chat';
import LoadConversations from '../LoadConversations';

const Stack = createNativeStackNavigator();

const MessageStack = ({ navigation, route }) => {
    return(
        <Stack.Navigator initialRouteName='Conversations'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Conversations" component={Conversations} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="LoadConversations" component={LoadConversations} />
        </Stack.Navigator>
    );
};

export default MessageStack;