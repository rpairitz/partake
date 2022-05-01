import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        color: "#A4C4FF",
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#75d2ff",
        width: 100,
        padding: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Avenir'
    }
});

const LoadConversations = ({ navigation, route }) => {

    const [conversations, setConversations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [newName, setNewName] = useState('');

    const loadConversations = (uname) => {
        var axios = require('axios');
        let formData = new FormData();

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/conversations.php', formData)
            .then(res=>{
                console.log(res.data);
                const convos = res.data.split(".");
                convos.pop();
                setConversations(convos);
                
            }).catch(err=>console.log(err));
    };

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((gotItem) => {
            setUsername(gotItem);
            return gotItem;
        })
        .then((uname) => {
            loadConversations(uname);
        })
        .catch((error) => console.log(error))
    }, []);

    const addToGroup = (convoID) => {
        var axios = require('axios');
        let formData = new FormData();

        formData.append('name', newName);
        formData.append('convoID', convoID);

        axios.post('http://23.22.183.138:8806/addToGroup.php', formData)
        .then(res=>{
            console.log(res.data);
        }).catch(err=>console.log(err));

    }

    return conversations.map((convo) => {
        return(
            <View style={{ flexDirection: 'row', flexWrap: 'wrap ' }}>
                <TouchableOpacity key={convo} onPress={() => {navigation.navigate({name: 'Chat', params: {convoID: convo, username: username}});}}>
                    <Text style={styles.section}>Conversation #{convo}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-outline" size="24px" color="#A4C4FF" />
                </TouchableOpacity>
                <Text>{'\n'}</Text>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Ionicons name="close-outline" size="24px" color="#A4C4FF" />
                        </Pressable>
                        <Text style={styles.modalText}>Enter name of the person you'd like to add to this group:</Text>
                        <TextInput 
                            placeholder='Name'
                            onChangeText={(name) => setNewName(name)}
                        />
                        <Text>{'\n'}</Text>
                        <TouchableOpacity onPress={() => {addToGroup(convo); setModalVisible(!modalVisible)}} style={styles.button}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>
        );
    });
};

export default LoadConversations;