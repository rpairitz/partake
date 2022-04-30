import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import Logomark from '../img/logo_logomark.svg';
import colors from '../styles/theme';
import InlineButton from './InlineButton';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    logoContainer: {
        marginTop: windowHeight/3.44,
        marginBottom: 21,
        top: 0,
        height:((windowWidth/1.618)+26)/2.0261
    },
    authInputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 13,
        padding: 13,
        marginBottom: 13,
        justifyContent: 'center',
        borderWidth: 0.618,
        borderColor: colors.grayInactive
    },
    authInput: {
        width: (windowWidth / 1.618),
        fontSize: 13,
        textAlign: 'left',
        fontFamily: 'Arial',
    },
    inlineContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'baseline',
    },
    inlineLabel: { 
        fontFamily: 'Arial', 
        fontWeight: 'bold', 
        color: colors.grayActive 
    },
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
                    AsyncStorage.setItem("partakeCredentials", username);
                } else if(res.data === 'User'){
                    alert("This email does not have an account associated with it. Please register before continuing.");
                } else if(res.data === 'Password'){
                    alert("Incorrect password.")
                }
            }).catch(err=>console.log(err));
        }

    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logomark width={(windowWidth/1.618)+26} height='100%'/>
            </View>
            <View style={styles.authInputContainer}>
                <TextInput
                    style={styles.authInput}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={colors.grayInactive}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.authInputContainer}>
                <TextInput
                    style={styles.authInput}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={colors.grayInactive}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <Button onPress={() => { login() }} text={'Log in'} width={(windowWidth/1.618)}/>

            <View style={styles.inlineContainer}>
                <Text style={styles.inlineLabel}>
                    New user?{'\u00A0'}
                </Text>
                <InlineButton onPress={() => navigation.navigate('Register')} text={'Sign up.'} />
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
}

export default Login;