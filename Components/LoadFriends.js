import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/theme';
import InlineButton from './InlineButton';

const styles = StyleSheet.create({
    section: {
        color: "#000",
        fontFamily: 'Avenir',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    friendContainer: {
        flexDirection: 'row'
    },
    altContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    defaultText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: colors.grayActive,
    }
});

const LoadFriends = ({ navigation, route }) => {
    const [friends, setFriends] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState();
    const [convoID, setConvoID] = useState();

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

    const loadFriends = (uname) => {
        var axios = require('axios');
        let formData = new FormData();

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/getFriends.php', formData)
        .then(res=>{
            const allFriends = res.data.split("\n");
            allFriends.pop();
            var userFriends = [];
            for(let i = 0; i < allFriends.length; i++) {
                let tempFriend = allFriends[i].split("~");
                userFriends.push(tempFriend);
            }
            setFriends(userFriends);
            setIsLoaded(true);
        }).catch(err=>console.log(err));
    };

    const startConversation = (currentUser, friendUser) => {
        var axios = require('axios');
        let formData = new FormData();

        let userID = currentUser;
        let friendID = friendUser;

        formData.append('userID', userID);
        formData.append('friendID', friendID);

        axios.post('http://23.22.183.138:8806/startConversation.php', formData)
        .then(res=>{
            var convos = res.data.split("~");
            setConvoID(Number(convos[0]));
        }).catch(err=>console.log(err));
    };

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((gotItem) => {
            setUsername(gotItem);
            return gotItem;
        })
        .then((uname) => {
            loadFriends(uname);
        })
        .then(() => {
            getID();
        })
        .catch((error) => console.log(error))
    }, [user]);

    if(!isLoaded) {
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    else if (friends.length != 0) {
        return (
            friends.map((friend) => {
            return(
                <View style={styles.friendContainer}>
                    <TouchableOpacity onPress={() => {startConversation(user, Number(friend[1])); navigation.navigate({name: 'Chat', params: {convoID: convoID, username: username, userID: user}});}}>
                        <Text style={styles.section}>{friend[0]}</Text>
                    </TouchableOpacity>
                </View>
            );
        })
        );
    }
    else {
        return (
            <View style={{height: 89, flexDirection: 'row', justifyContent: 'center',alignItems: 'center',}}>
                <View style={styles.altContainer}>
                    <Text style={styles.defaultText}>You have no friends.{'\u00A0'}</Text>
                    <InlineButton text='Meet people with similar hobbies!' onPress={() => navigation.navigate('Search')}
                        style={{ fontSize: 15, fontWeight: 'regular', top: 0.5 }} />
                </View>
            </View>
        )
    }
};

export default LoadFriends;