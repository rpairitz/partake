import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/theme';
import CustomModal from './CustomModal';
import Ionicons from "@expo/vector-icons/Ionicons";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        paddingTop: 0,
        paddingRight: 15,
        paddingBottom: 21,
        paddingLeft: 16,
    },
    labelName: {
        color: colors.grayActive,
        fontFamily: 'Arial',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        paddingRight: 0,
        paddingLeft: 0,
    },
    labelPreview: {
        color: colors.grayInactive,
        fontFamily: 'Arial',
        fontSize: 15,
        paddingBottom: 5,
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
    },
    altContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: colors.grayActive,
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
                <ActivityIndicator size="large" color={colors.blue} />
            </View>
        );
    }
    else if (conversations.length != 0) {
        return conversations.map((convo) => {
            return(
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity key={convo.convoId} 
                        style={styles.messageContainer}
                        onPress={() => {navigation.navigate({name: 'Chat', params: {convoID: convo.convoId, username: username, userID: user}});}}>
                        <Text style={styles.labelName}>{convo.names}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => setModalVisible(true)}>
                        <Ionicons name="add-outline" size="24px" color="black" />
                    </TouchableOpacity>

                    <CustomModal modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)}
                        setNewName={(name) => setNewName(name)}
                        onPressButton={() => { addToGroup(convo); setModalVisible(!modalVisible) }} />
                </View>
            );
        });
    }
    else {
        return (
            <View style={styles.altContainer}>
                <Text style={styles.defaultText}>You have no conversations.</Text>
            </View>
        )
    }
};

export default LoadConversations;