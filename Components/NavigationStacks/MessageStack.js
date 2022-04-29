import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Conversations from '../Conversations';
import Chat from '../Chat';
import LoadConversations from '../LoadConversations';
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const MessageStack = ({ navigation, route }) => {
    return(
        <Stack.Navigator initialRouteName='Conversations'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Conversations" component={Conversations} options={{ headerRight: () => (
                <Ionicons name="add-outline" size="24px" color="#75d2ff" />
            )}} />
            <Stack.Screen name="Chat" component={Chat} options={{ contentStyle: { backgroundColor: "#FFFFFF" }}} />
            <Stack.Screen name="LoadConversations" component={LoadConversations} />
        </Stack.Navigator>
    );
};

export default MessageStack;