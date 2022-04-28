import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    inputView: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        width: 300,
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#d4d4d4"
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Avenir',
      },
      login: {
        color: '#75d2ff',
        textAlign: 'center',
        fontFamily: 'Avenir',
      },
      loginBtn: {
        width: 300,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
      }
});

const Register = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const register = () => {
        if(!username || !password || !repeatPassword) {
            alert('One or more fields is missing. Please fill out all required fields.');
        }
        var axios = require('axios');
        let formData = new FormData();
        if(password === repeatPassword){
            formData.append('email', username);
            formData.append('password', password);
            axios.post('http://23.22.183.138:8806/register.php', formData)
            .then(res=>{ 
                if(res.data === 'Success'){
                    navigation.navigate('CreateProfile');
                } else{
                    alert("Unable to register. There may already be a user registered with this email.");
                }
            }).catch(err=>console.log(err));
        } else{
            alert("Passwords don't match");
        }
    }

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
                    <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Avenir' }}>partake</Text>
                </View>
            </View>
            <View style={{flex: 5, alignItems: 'center'}}>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                        value={username}
                        placeholder='Email'
                        placeholderTextColor='#bfbfbf'
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        value={password}
                        placeholder='Password'
                        placeholderTextColor='#bfbfbf'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        value={repeatPassword}
                        placeholder='Repeat password'
                        placeholderTextColor='#bfbfbf'
                        secureTextEntry={true}
                        onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                    />
                </View>
                <Text>{'\n'}</Text>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#75d2ff', '#96a9d5', '#9fa4d0', '#bfa8e0', '#d7b1cd']}
                    start={[0, 1]} 
                    end={[1, 0]}
                    style={styles.loginBtn}>
                        <TouchableOpacity onPress={() => {register()}} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>
                </LinearGradient>
                <Text>{'\n'}</Text>
                <TouchableOpacity>
                    <Text style={{ fontFamily: 'Avenir'}}>Already a User?
                        <Text onPress={() => navigation.navigate('Login')} style={styles.login}> Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register;