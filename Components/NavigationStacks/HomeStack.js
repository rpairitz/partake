import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useLayoutEffect } from "react";
import Chat from "../Chat";
import BottomTabNavigator from "./BottomTab";
import Wordmark from "../../img/logo_wordmark.svg";
import PrefsMenu from "../PrefsMenu";
import PrefsIcon from "../../img/icon_prefs.svg";
import { TouchableOpacity, SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {
    const [showPrefs, setShowPrefs] = useState(false);
    const [showPrefsMenu, setShowPrefsMenu] = useState(true);

    const onPrefsPress = () => {
        setShowPrefs(!showPrefs);
    }

    // useLayoutEffect(() => {
    //     const routeName = route.name;
    //     // TODO: set showPrefsMenu
    //     routeName === 'Home' ? setShowPrefsMenu(true) : setShowPrefsMenu(false);
    // }, [navigation, route]);

    return (
        <>
        <SafeAreaView style={{position: 'absolute',left:16, zIndex: 99999}}>
            <PrefsMenu text={'Log out'} showPrefs={showPrefs} onPrefsPress={onPrefsPress}/>
        </SafeAreaView>
            <Stack.Navigator screenOptions={{
                headerShown: true,
                animation: 'none',
                headerShadowVisible: false,
            }}>
                {/* <Stack.Screen name="Home"
                    options={({navigation, route}) => ({
                        headerTitle: () => <Wordmark width={136.9} height={38.43} onPress={() => navigation.navigate("Search")}/>,
                        headerLeft: () => <TouchableOpacity onPress={onPrefsPress}>
                            <PrefsIcon width={34} height={34}/>
                        </TouchableOpacity>
                        // headerLeft: () => <PrefsMenu text={'Log out'}/>,
                    })}
                >
                    {({navigation,route,showPrefs,onPrefsPress}) => 
                    <BottomTabNavigator navigation={navigation}
                        route={route}
                        showPrefs={showPrefs}
                        onPrefsPress={onPrefsPress}
                    />}
                </Stack.Screen> */}
                <Stack.Screen name="Home" component={BottomTabNavigator}
                    options={({navigation, route}) => ({
                        headerTitle: () => <Wordmark width={136.9} height={38.43} onPress={() => navigation.navigate("Search")}/>,
                        headerLeft: () => <TouchableOpacity onPress={onPrefsPress}>
                            <PrefsIcon width={34} height={34}/>
                        </TouchableOpacity>
                        // headerLeft: () => <PrefsMenu text={'Log out'}/>,
                    })}
                />
                <Stack.Screen name="Chat" component={Chat} options={{ contentStyle: { backgroundColor: "#FFFFFF" }}} />
            </Stack.Navigator>
        </>
    );
}

export default HomeStack;