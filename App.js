import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Components/Login';
import BottomTabNavigator from './Components/BottomTab';
import Register from './Components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={BottomTabNavigator}/>
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