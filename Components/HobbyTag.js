import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/theme";

const hobbyColors = {
    0: colors.iceBlue,
    1: colors.blue,
    2: colors.lavender,
    3: colors.purple,
    4: colors.orchid,
    5: colors.purple,
    6: colors.lavender,
    7: colors.blue,
};

const styles = (mod) => StyleSheet.create({
    tagContainer: {
        padding: 13,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 13,
        backgroundColor: hobbyColors[mod],
        marginRight: 5,
        marginBottom: 5, 
    },
    tagLabel: {
        color: colors.white,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 13,
    }
});

const HobbyTag = ({hobby,id,icon}) => {
    console.log(icon);
    if (icon)
    return (
        <TouchableOpacity style={styles((id)%8).tagContainer}>
          <Text style={styles((id)%8).tagLabel}>{hobby} {String.fromCodePoint(icon)}</Text>
        </TouchableOpacity>
    );
    else
    return (
        <TouchableOpacity style={styles((id)%8).tagContainer}>
          <Text style={styles((id)%8).tagLabel}>{hobby}</Text>
        </TouchableOpacity>
    )
};

export default HobbyTag;