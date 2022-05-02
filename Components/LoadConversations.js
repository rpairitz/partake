import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, ActivityIndicator, TextInput } from 'react-native';
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

const LoadConversations = ({ navigation, route }) => {

    const [conversations, setConversations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newName, setNewName] = useState('');
    const [user, setUser] = useState();

    const loadConversations = (uname) => {
        var axios = require('axios');
        let formData = new FormData();
        let allConvos = [];

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/conversations.php', formData)
            .then(res=>{
                console.log(res.data);
                const convos = res.data.split("\n");
                convos.pop();
                for(let i = 0; i < convos.length; i++){
                    let tempConvo = {}
                    let convoParts = convos[i].split("~");
                    let convoId = convoParts[0];
                    let convoNames = convoParts[1];
                    tempConvo.convoId = convoId;
                    tempConvo.names = convoNames;
                    allConvos.push(tempConvo);
                }
                setConversations(allConvos);
            }).catch(err=>console.log(err));
    };

    const getID = () => {
        var axios = require('axios');
        let formData = new FormData();
  
        formData.append('username', username);
        axios.post('http://23.22.183.138:8806/getID.php', formData)
        .then((res) => {
          setUser(Number(res.data));
          setIsLoaded(true);
        })
        .catch(err=>console.log(err));
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
        .then(() => {
            getID();
        })
        .catch((error) => console.log(error))
    }, [user]);

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

    if(!isLoaded) {
        return(
            <View style={[styles.loadingContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#75d2ff" />
            </View>
        );
    }
    else {
        return conversations.map((convo) => {
            return(
                <View style={{ flexDirection: 'row', flexWrap: 'wrap ' }}>
                    <TouchableOpacity key={convo.convoId} onPress={() => {navigation.navigate({name: 'Chat', params: {convoID: convo.convoId, username: username, userID: user}});}}>
                        <Text style={styles.section}>{convo.names}</Text>
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
    }
};

export default LoadConversations;