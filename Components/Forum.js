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

const Forum = ({ navigation, route }) => {
    return(
        <View style={styles.container}>
            <Text>
                Forum page.
            </Text>
        </View>
    );

}

export default Forum;