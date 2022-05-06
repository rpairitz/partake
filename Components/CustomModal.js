import { View, Text, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity } from "react-native";
import Button from "./Button";
import CancelIcon from '../img/icon_cancel.svg';
import { Dimensions } from "react-native";
import colors from "../styles/theme";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // width: windowWidth-68,
        // height: windowHeight/2.618,
        backgroundColor: colors.white,
        borderRadius: 21,
        padding: 21,
        paddingTop: 34,
        paddingBottom: 21,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 13,
        padding: 13,
        marginBottom: 13,
        justifyContent: 'center',
        borderWidth: 0.618,
        borderColor: colors.grayInactive
    },
    input: {
        width: (windowWidth / 1.618),
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'Arial',
    },
});

const CustomModal = ({modalVisible, setModalVisible, setNewName, onPressButton}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={setModalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable style={{position: 'absolute',top:13, left: 13}}
                        onPress={setModalVisible}
                    >
                        <View>
                        <CancelIcon width={13} height={13} />
                        </View>
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a friend's name..."
                            placeholderTextColor={colors.grayInactive}
                            onChangeText={setNewName}
                        />
                    </View>
                    <Button text='Add' width={windowWidth/1.618} onPress={onPressButton}/>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;