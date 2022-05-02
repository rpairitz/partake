import { createNavigationContainerRef } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = createNavigationContainerRef();

export function logOut() {
    if (navigationRef.isReady()) {
        AsyncStorage.setItem("partakeCredentials", '');
        navigation.navigate('Login');
    }
}