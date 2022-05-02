import { TouchableOpacity } from "react-native";
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/theme';

const styles = StyleSheet.create({
      button: {
        borderRadius: 13,
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 13,
      },
      buttonText: {
          color: colors.white,
          fontWeight: 'bold',
          fontFamily: 'Arial',
          textAlign: 'center',
      },
});

const Button = ({text, onPress, width}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={[colors.iceBlue, colors.orchid]}
                start={[0, 1]}
                end={[1, 0]}
                onPress={() => navigation.navigate('Home')}
                style={styles.button}>
                <Text style={[styles.buttonText,{width: width}]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default Button;