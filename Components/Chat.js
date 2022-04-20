import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const Chat = ({ navigation, route }) => {
    return(
        <View style={styles.container}>
            <Text>
                Chat page.
            </Text>
        </View>
    );

}

export default Chat;