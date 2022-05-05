import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginStack from './Components/NavigationStacks/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './Components/NavigationStacks/HomeStack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(false);
  const [prof, setProfile] = useState(false);
  const [hobby, setHobby] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('partakeCredentials')
    .then((loggedIn) => {
      if(loggedIn){
        setUser(true);
      }
    });
    AsyncStorage.getItem('profFlag')
    .then((created) => {
      if(created){
        setProfile(true);
      }
    });
    AsyncStorage.getItem('hobbyFlag')
    .then((hobbied) => {
      if(hobbied){
        setHobby(true);
      }
    });
  }, [user, prof, hobby])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,}}>
      {
        (user && prof && hobby) ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="LoginStack" component={LoginStack} />
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}