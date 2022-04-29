import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import LoadConversations from './LoadConversations';

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

const Conversations = ({ navigation, route }) => {

    return(
        <View style={styles.container}>
            <Text style={styles.section}>Messages</Text>
            <LoadConversations navigation={navigation}/>
        </View>
    );
};

export default Conversations;