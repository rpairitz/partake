import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        paddingTop: 60,
        flex: 1, flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    loginText: {
        color: '#FFFFFF'
    },
    inputView: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        width: 300,
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center'
      },
      login: {
        color: '#75d2ff',
        textAlign: 'center'
      },
      loginBtn: {
        width: 300,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#75d2ff',
      }
});

const Register = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    return(
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <View
                        style={{ flex: 1, paddingRight: 10 }}>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ flex: 1, paddingTop: 30, }}>
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>partake</Text>
                </View>
            </View>
            <View style={{flex: 5, alignItems: 'center'}}>
                <View>
                    <TextInput
                        value={username}
                        placeholder='Email'
                        placeholderTextColor='#000000'
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <View>
                    <TextInput
                        value={password}
                        placeholder='Password'
                        placeholderTextColor='#000000'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View>
                    <TextInput
                        value={repeatPassword}
                        placeholder='Repeat password'
                        placeholderTextColor='#000000'
                        secureTextEntry={true}
                        onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                    />
                </View>
                <TouchableOpacity>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Already a User?
                        <Text> Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register;