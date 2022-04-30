import React, { useState , useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
      }
});

const Login = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        var axios = require('axios');
        let formData = new FormData();
        //let formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        //console.log(cryptr.encrypt(password));
        axios.post('http://23.22.183.138:8806/login.php', formData)
            .then(res=>{ 
                console.log(res.data);
                if(res.data === 'Success'){
                    navigation.navigate('Home');
                    AsyncStorage.setItem("partakeCredentials", email);
                } else if(res.data === 'User'){
                    alert("This email does not have an account associated with it. Please register before continuing.");
                } else if(res.data === 'Password'){
                    alert("Incorrect password.")
                }
            }).catch(err=>console.log(err));
        } 
        
        /*
        axios.get('http://23.22.183.138:8806/login.php')
        .then((response) => {
            return response;
        })
        .then((data) => {
            var dataArr = data.data.split(/(\s+)/).filter(
                function(e) { 
                    return e.trim().length > 0;
                }
            );
            if(!email || !password) {
                alert('One or more fields is missing. Please fill out all required fields.');
            }
            else if(email) {
                if(dataArr.includes(email)) {
                    var emailIndex = dataArr.indexOf(email);
                    if(email === dataArr[emailIndex] && password === dataArr[emailIndex + 1]) {
                        console.log('authenticated');
                        navigation.navigate('Home');
                    }
                    else {
                        alert("Incorrect credentials entered. Try again.");
                    }
                }
                else {
                    alert("This email does not have an account associated with it. Please register before continuing.");
                }
            }
        })
        .catch((error) => console.log(error));
        
    }
    */

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
                        value={email}
                        placeholder='Email'
                        placeholderTextColor='#bfbfbf'
                        onChangeText={(email) => setEmail(email)}
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
                <Text>{'\n'}</Text>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#75d2ff', '#96a9d5', '#9fa4d0', '#bfa8e0', '#d7b1cd']}
                    start={[0, 1]} 
                    end={[1, 0]}
                    onPress={() => navigation.navigate('Home')}
                    style={styles.loginBtn}>
                        <TouchableOpacity onPress={() => {login()}} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Log In</Text>
                        </TouchableOpacity>
                </LinearGradient>
                <Text>{'\n'}</Text>
                <TouchableOpacity>
                    <Text style={{ fontFamily: 'Avenir'}}>New User?
                        <Text onPress={() => navigation.navigate('Register')} style={styles.login}> Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;