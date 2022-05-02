import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import PrefsIcon from "../img/icon_prefs.svg";
import colors from "../styles/theme";
import LogoutIcon from "../img/icon_log out.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const PrefsMenu = ({text, showPrefs, onPrefsPress}) => {
    const navigation = useNavigation();

    const logOut = () => {
        AsyncStorage.setItem("partakeCredentials", '');
        navigation.navigate('LoginStack', {screen: 'Login'});
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={onPrefsPress}
                style={{display: 'none', overflow: 'visible', zIndex: 99999, top: 5}}>
                <PrefsIcon width={34} height={34} />
            </TouchableOpacity>
            {showPrefs &&
                <TouchableOpacity onPress={logOut}
                    style={{
                        position: "absolute",
                        zIndex: 99999,
                        top: 34 + 13,
                        left: 0,
                        backgroundColor: colors.offWhite,
                        padding: 6,
                        paddingLeft: 21,
                        paddingRight: 21,
                        borderRadius: 23,
                        shadowColor: '#000',
                        shadowRadius: 21,
                        shadowOpacity: .16,
                        shadowOffset: {
                            width: 0,
                            height: 0
                        }
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-around",
                        alignItems: 'center',
                        width: 199,
                    }}>
                        <Text style={{ width: 199 - 34, fontFamily: 'Arial', fontSize: 18, color: colors.grayActive, }}>{text}</Text>
                        <LogoutIcon width={34} height={34} color={colors.grayActive} />
                    </View>
                </TouchableOpacity>
            }
        </SafeAreaView>
    );
};

export default PrefsMenu;