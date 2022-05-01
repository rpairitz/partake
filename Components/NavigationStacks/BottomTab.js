import { useLayoutEffect } from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const BottomTabNavigator = ({ navigation, route }) => {
    const logOut = () => {
        AsyncStorage.setItem("partakeCredentials", '');
        navigation.navigate('Login');
    };

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Messages';
        navigation.setOptions({
            headerRight: () => (
                <MessagesIcon width={34} height={34}
                    color={routeName === "Messages" ? colors.grayActive : colors.grayInactive}
                    onPress={() => navigation.navigate("Messages")} />
            ),
        });
    }, [navigation, route]);

    return (
        <BottomTab.Navigator
            // tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,3)}}/>}
            initialRouteName='Search'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { height: 89 },
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
                options={{
                    headerTintColor: '#75d2ff',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { logOut() }}>
                            <Text style={styles.container}>Log Out</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <BottomTab.Screen name="Search"
                component={Search}
                options={{
                    headerTintColor: '#75d2ff'
                }}
            />
            <BottomTab.Screen name="Forums"
                component={Forums}
                options={{
                    headerTintColor: '#75d2ff',
                    unmountOnBlur: true
                }}
            />
            <BottomTab.Screen name="Messages"
                component={MessageStack}
            />
        </BottomTab.Navigator>
    );

}

export default BottomTabNavigator;