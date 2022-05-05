import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import ActionsIcon from "../img/icon_ellipses.svg";
import colors from "../styles/theme";
// import { useNavigation } from "@react-navigation/native";
import PlusIcon from '../img/icon_plus.svg';
import { useState } from "react";
import CustomModal from "./CustomModal";

const ActionsMenu = ({showActions, onActionsPress}) => {
    // const navigation = useNavigation();
    const [modalVisible,setModalVisible] = useState(false);

    // TODO: write add user method
    // const addUser = () => {
    //     navigation.navigate('Messages', {screen: 'Conversations'});
    // }

    return (
        <>
            <CustomModal modalVisible={modalVisible} setModalVisible={()=>setModalVisible(!setModalVisible)}/>
            <TouchableOpacity onPress={onActionsPress}
                style={{zIndex: 99999,}}>
                <ActionsIcon width={34} height={34} />
            </TouchableOpacity>
            {showActions &&
                <TouchableOpacity onPress={() => {setModalVisible(true); onActionsPress(false);}}
                    style={{
                        position: "absolute",
                        zIndex: 99999,
                        top: 34 + 13,
                        right: 5,
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
                        <Text style={{ width: 199 - 34, fontFamily: 'Arial', fontSize: 18, color: colors.grayActive, }}>Add Friend</Text>
                        <PlusIcon width={34} height={34} />
                    </View>
                </TouchableOpacity>
            }
        </>
    );
};

export default ActionsMenu;