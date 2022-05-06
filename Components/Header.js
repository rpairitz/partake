import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../styles/theme";
import BackIcon from "../img/icon_back.svg";

const Header = ({ text, displayBack, onPressBack }) => {
    return (
        <SafeAreaView edges={['top']}
            style={{ height: 89, zIndex: 99999, borderBottomColor: colors.grayInactive, borderBottomWidth: 0.38, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {displayBack ?
                    <TouchableOpacity onPress={onPressBack} style={{ marginRight: 5, flex: 1 }}>
                        <BackIcon width={34} height={34} />
                    </TouchableOpacity>
                    :
                    <View style={{flex: 1}}/>
                }
                <Text style={[{
                    textAlign: 'center', fontFamily: 'Arial', fontWeight: 'bold', fontSize: 18, color: colors.grayActive,
                },displayBack??{textAlignVertical: 'bottom'}]}>
                    {text}
                </Text>
                {/* <ActionsMenu showActions={showActions} onActionsPress={onActionsPress} /> */}
                <View style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    );
};

export default Header;