import { View } from "react-native";
import PrefsMenu from "./PrefsMenu";
import Wordmark from "../img/logo_wordmark.svg";

const Header = ({navigation}) => {
    return (
        <View style={{
            marginTop: 42,
            height: 47,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            zIndex: 1000000,
            overflow: 'visible',
        }}>
            <PrefsMenu text={'Log out'}/>
            <Wordmark width={136.9} height={38.43} onPress={() => navigation.navigate("Search")}/>
        </View>
    );
};

export default Header;