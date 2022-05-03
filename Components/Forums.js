import { View, Text,FlatList, TouchableOpacity, StyleSheet, Modal, Pressable, ActivityIndicator, TextInput } from 'react-native';
import colors from '../styles/theme';
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

 
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

// placeholder for forums screen
const Forums = () => {

    const[email, setEmail] = useState('');
    const[allHobbies, setAllHobbies] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((loggedIn) => {
            setEmail(loggedIn);
            var axios = require('axios');
            let formData = new FormData();
            formData.append('email', email);
            axios.post('http://23.22.183.138:8806/getForumHobbies.php', formData)
            .then(res=>{ 
                let hobbies = [];
                var data = res.data.split("\n");
                data.pop();
                for(let i=0; i < data.length; i++){
                    let tempHobby = {};
                    let hobbyParts = data[i].split("~");
                    tempHobby.id = hobbyParts[0];
                    tempHobby.name = hobbyParts[1];
                    tempHobby.icon = hobbyParts[2];
                    hobbies.push(tempHobby);
                }
                console.log(hobbies);
                setAllHobbies(hobbies);
            }).catch(err=>console.log(err));
        });
    }, [email])

    if(allHobbies.length == 0){
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: colors.white,
                }}>

                <Text style={{fontFamily: 'Arial', fontSize: 13, color: colors.grayActive}}>Forums not yet available.</Text>
            </View>
        );
    } else{
        return(
            <View style={{
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: colors.white,
                }}>
                    
            </View>
        );
    }
};

export default Forums;