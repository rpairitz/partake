import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/theme';
import { TouchableOpacity } from 'react-native';

const InlineButton = ({text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{alignSelf: 'flex-start'}}>
            <MaskedView maskElement={
                <Text style={{fontSize: 13, fontWeight: 'bold',}}>{text}</Text>
            }>
                <LinearGradient colors={[colors.iceBlue, colors.orchid]}
                start={[0, 1]} 
                end={[1, 0]}
                >
                    <Text style={{fontSize: 13, fontFamily: 'Avenir', fontWeight: 'bold',opacity: 0}}>{text}</Text>
                </LinearGradient>
            </MaskedView>
        </TouchableOpacity>
    );
};

export default InlineButton;