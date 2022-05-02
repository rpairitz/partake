import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import colors from '../styles/theme';
import LoadConversations from './LoadConversations';
import LoadFriends from './LoadFriends';
import RecruitIcon from '../img/icon_recruit.svg';
import InlineButton from './InlineButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    labelSpan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        marginLeft: 13,
        marginRight: 13,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    labelText: {
        color: colors.blue,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },
    icon: {
        alignSelf: 'flex-end',
        paddingRight: 5,
    }
});

const Conversations = ({ navigation, route }) => {

    return(
        <View style={styles.container}>
            <View style={styles.labelSpan}>
                <View style={styles.labelContainer}>
                    <RecruitIcon width={34} height={34} gradStart={colors.blue} gradEnd={colors.blue} />
                    <Text style={styles.labelText}>Friends</Text>
                </View>
                {/* need to add inlineButton for Create Group */}
                <View style={[styles.labelText, {top: -1}]}>
                    <InlineButton text={'Create Group'} onPress={console.log('create group')} style={{fontSize: 15}}/>
                </View>
            </View>
            <LoadFriends navigation={navigation}/>
            <View style={styles.labelSpan}>
                <Text style={styles.labelText}>Messages</Text>
            </View>
            <LoadConversations navigation={navigation}/>
        </View>
    );
};

export default Conversations;