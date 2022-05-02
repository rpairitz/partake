import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import LoadConversations from './LoadConversations';
import LoadFriends from './LoadFriends';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        color: "#A4C4FF",
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        paddingLeft: 15,
    },
    icon: {
        alignSelf: 'flex-end',
        paddingRight: 5,
    }
});

const Conversations = ({ navigation, route }) => {

    return(
        <View style={styles.container}>
            <Text style={styles.section}>Friends</Text>
            <LoadFriends navigation={navigation}/>
            <Text style={styles.section}>Messages</Text>
            <LoadConversations navigation={navigation}/>
        </View>
    );
};

export default Conversations;