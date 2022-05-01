import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../Chat";
import BottomTabNavigator from "./BottomTab";
import MessageStack from "./MessageStack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'none',
            }}>
                <Stack.Screen name="Home" component={BottomTabNavigator}/>
                {/* <Stack.Screen name="Chat" component={MessageStack}/> */}
                <Stack.Screen name="Chat" component={Chat} options={{ contentStyle: { backgroundColor: "#FFFFFF" }}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HomeStack;