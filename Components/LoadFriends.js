import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadFriends = ({ navigation, route }) => {

    const [friends, setFriends] = useState([]);
    const [username, setUsername] = useState('');

    const loadFriends = (uname) => {
        var axios = require('axios');
        let formData = new FormData();

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/getFriends.php', formData)
        .then(res=>{
            console.log(res.data);
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
        .catch((error) => console.log(error))
    }, []);

    return(
        <View>
            <Text>Load Friends.</Text>
        </View>
    );

};

export default LoadFriends;