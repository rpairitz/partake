import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Components/Login';
import CreateProfile from './Components/CreateProfile';
import BottomTabNavigator from './Components/NavigationStacks/BottomTab';
import Register from './Components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from './Components/NavigationStacks/LoginStack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(false);

  useEffect(() => {
  }, [user])

  if(!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerShown: false,
        }}
        >
          <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <BottomTabNavigator />
    );
  }
}