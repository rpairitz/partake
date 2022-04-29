import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    }
});

const LoadConversations = ({ navigation, route }) => {

    const [conversations, setConversations] = useState([]);

    const loadConversations = () => {
        var axios = require('axios');
        let formData = new FormData();

        var username = 'imoore1098@example.com';
        formData.append('username', username);

        axios.post('http://23.22.183.138:8806/conversations.php', formData)
            .then(res=>{
                console.log(res.data);
                const convos = res.data.split(".");
                convos.pop();
                setConversations(convos);
                
            }).catch(err=>console.log(err));
    };

    useEffect(() => {
        loadConversations();
    }, []);

    return conversations.map((convo) => {
        return(
            <View>
                <TouchableOpacity onPress={() => {navigation.navigate('Chat')}}>
                    <Text>{/* onPress will pass convoID as a prop down to messages page for that conversation */}</Text>
                    <Text style={styles.section}>Conversation #{convo}</Text>
                </TouchableOpacity>
                <Text>{'\n'}</Text>
            </View>
        );
    });
};

export default LoadConversations;