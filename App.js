import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './Components/NavigationStacks/BottomTab';
import LoginStack from './Components/NavigationStacks/LoginStack';
import RootStack from './Components/NavigationStacks/RootStack';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from './Components/CredentialsContext';

export default function App() {
  const[appReady, setAppReady] = useState(false);
  const[storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    
    AsyncStorage.getItem('partakeCredentials')
    .then((result) => {
      if(result != null){
        setStoredCredentials(result);
      } else{
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))

  }

  if(!appReady){
    return(
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}