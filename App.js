import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './Components/NavigationStacks/BottomTab';
import LoginStack from './Components/NavigationStacks/LoginStack';

export default function App() {

  const [user, setUser] = useState(false);

  useEffect(() => {
  }, [user])

  if(!user) {
    return (
      <LoginStack />
    );
  }
  else {
    return (
      <BottomTabNavigator />
    );
  }
}