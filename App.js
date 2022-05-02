import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginStack from './Components/NavigationStacks/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './Components/NavigationStacks/HomeStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('partakeCredentials')
    .then((loggedIn) => {
      if(loggedIn){
        setUser(true);
      }
    });
  }, [user])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,}}>
      {
        user ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="LoginStack" component={LoginStack} />
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}