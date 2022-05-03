import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../styles/theme';
import LoadConversations from './LoadConversations';
import LoadFriends from './LoadFriends';
import RecruitIcon from '../img/icon_recruit.svg';
import InlineButton from './InlineButton';

const styles = StyleSheet.create({
    container: {
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
    friendsContainer: {
        maxHeight: 119,
    },
    friendsContentContainer: {
        paddingLeft: 16,
    },
    icon: {
        alignSelf: 'flex-end',
        paddingRight: 5,
    }
});

const Conversations = ({ navigation, route }) => {
    return (
        <View style={[styles.container, {flex: 1}]}>
            <ScrollView contentContainerStyle={styles.container} overScrollMode='always'>
                <View style={styles.labelSpan}>
                    <View style={styles.labelContainer}>
                        <RecruitIcon width={34} height={34} gradStart={colors.blue} gradEnd={colors.blue} />
                        <Text style={styles.labelText}>Friends</Text>
                    </View>
                    {/* need to add inlineButton for Create Group */}
                    <View style={[styles.labelText, { top: -1 }]}>
                        <InlineButton text={'Create Group'} onPress={console.log('create group')} style={{ fontSize: 15 }} />
                    </View>
                </View>
                <View style={styles.friendsContainer}>
                    <ScrollView contentContainerStyle={styles.friendsContentContainer} horizontal={true}>
                        <LoadFriends navigation={navigation} />
                    </ScrollView>
                </View>
                <View style={styles.labelSpan}>
                    <Text style={styles.labelText}>Messages</Text>
                </View>
                <LoadConversations navigation={navigation} />
            </ScrollView>
        </View>
    );
};

export default Conversations;