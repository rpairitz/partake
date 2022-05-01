import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../Chat";
import BottomTabNavigator from "./BottomTab";
import Wordmark from "../../img/logo_wordmark.svg";
import PrefsIcon from "../../img/icon_prefs.svg";
import colors from "../../styles/theme";

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: true,
                animation: 'none',
            }}>
                <Stack.Screen name="Home" component={BottomTabNavigator}
                    options={({navigation, route}) => ({
                        headerTitle: () => <Wordmark width={136.9} height={38.43} onPress={() => navigation.navigate("Search")}/>,
                        headerLeft: () => <PrefsIcon width={34} height={34}/>,
                    })}
                />
                <Stack.Screen name="Chat" component={Chat} options={{ contentStyle: { backgroundColor: "#FFFFFF" }}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HomeStack;