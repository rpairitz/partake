import { useLayoutEffect, memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Search from '../Search';
import ProfileStack from './ProfileStack';
import MessageStack from './MessageStack';
import Brandmark from '../../img/logo_brandmark.svg';
import MessagesIcon from '../../img/icon_messages.svg';
import ProfileIcon from '../../img/icon_profile.svg';
import ForumsIcon from '../../img/icon_forum.svg';
import colors from '../../styles/theme';
import Forums from '../Forums';

const styles = StyleSheet.create({
    container: {
      color: "#75d2ff",
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: 'bold',
      paddingRight: 15
    },
});

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, route, showPrefs, onPrefsPress }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        navigation.setOptions({
            headerRight: () => (
                <MessagesIcon width={34} height={34}
                    color={routeName === "Messages" ? colors.grayActive : colors.grayInactive}
                    onPress={() => navigation.navigate("Messages")} />
            ),
        });
    }, [navigation, route]);

    return (
        <>
        {/* <View style={{position: 'absolute', top:-12, left:0, zIndex: 99999}}>
            <PrefsMenu text={'Log out'} showPrefs={showPrefs} onPrefsPress={onPrefsPress}/>
        </View> */}
        <BottomTab.Navigator
            initialRouteName='Search'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { height: 89 },
                // exclude Messages button from bottom tab
                tabBarButton: ["Messages"].includes(route.name) ? () => {return null} : undefined,
                tabBarIcon: ({ focused }) => {
                    if (route.name === "Search") {
                        return (
                            focused ?
                                <Brandmark width={36.16} height={34}
                                    color={colors.logoActive} gradStart={colors.iceBlue} gradEnd={colors.orchid} />
                                :
                                <Brandmark width={36.16} height={34}
                                    color={colors.grayInactive} gradStart={colors.grayInactive} gradEnd={colors.grayInactive} />
                        );
                    } else if (route.name === "Forums") {
                        return (
                            <ForumsIcon width={34} height={34}
                                color={focused ? colors.grayActive : colors.grayInactive}
                                spoke1={focused ? colors.blue : colors.grayInactive}
                                spoke2={focused ? colors.lavender : colors.grayInactive}
                                spoke3={focused ? colors.purple : colors.grayInactive} />
                        );
                    } else if (route.name === "Profile") {
                        return (
                            <ProfileIcon width={34} height={34}
                                color={focused ? colors.grayActive : colors.grayInactive} />
                        );
                    }
                },
                tabBarActiveTintColor: "#75d2ff",
                tabBarInactiveTintColor: "#75d2ff",
                tabBarShowLabel: false,
            })}
        >
            <BottomTab.Screen name="Profile"
                component={ProfileStack}
            />
            <BottomTab.Screen name="Search"
                component={Search}
            />
            <BottomTab.Screen name="Forums"
                component={Forums}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <BottomTab.Screen name="Messages"
                component={MessageStack}
            />
        </BottomTab.Navigator>
        </>
    );

};

export default memo(BottomTabNavigator);