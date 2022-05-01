import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import BottomTabNavigator from './Components/NavigationStacks/BottomTab';
import LoginStack from './Components/NavigationStacks/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

  if(!user){
    return(<LoginStack />);
  } else{
    return(<BottomTabNavigator />);
  }
}