import React, { useState, useEffect } from 'react';
import LoginStack from './Components/NavigationStacks/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './Components/NavigationStacks/HomeStack';

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
    return (<HomeStack/>);
  }
}