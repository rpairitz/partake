import { View, Text } from 'react-native';
import colors from '../styles/theme';

// placeholder for forums screen
const Forums = () => {
    return (
        <View style={{flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Arial', fontSize: 13, color: colors.grayActive}}>Forums not yet available.</Text>
        </View>
    );
};

export default Forums;