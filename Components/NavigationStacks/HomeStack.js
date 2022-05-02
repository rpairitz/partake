import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import Chat from "../Chat";
import BottomTabNavigator from "./BottomTab";
import Wordmark from "../../img/logo_wordmark.svg";
import PrefsMenu from "../PrefsMenu";
import PrefsIcon from "../../img/icon_prefs.svg";
import ActionsIcon from "../../img/icon_ellipses.svg";
import BackIcon from "../../img/icon_back.svg";
import { TouchableOpacity, SafeAreaView } from "react-native";
import colors from "../../styles/theme";

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {
    const [showPrefs, setShowPrefs] = useState(false);
    // const [showPrefsMenu, setShowPrefsMenu] = useState(true);

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
                    })}
                />
                <Stack.Screen name="Chat" component={Chat} 
                // screenOptions={{
                // headerRight: () => (
                //     <ActionsIcon width={34} height={34}/>
                // )}}
                options={{ contentStyle: { backgroundColor: colors.white },
                headerBackTitleVisible: false,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon width={34} height={34}/>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <ActionsIcon width={34} height={34}/>
                )}} />
            </Stack.Navigator>
        </>
    );
}

export default HomeStack;