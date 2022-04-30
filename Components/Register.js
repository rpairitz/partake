import React, { useState } from 'react'
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
        //let formData = new URLSearchParams();
        if(password === repeatPassword){
            formData.append('email', username);
            formData.append('password', password);
            axios.post('http://23.22.183.138:8806/register.php', formData)
            .then(res=>{
                console.log(res.data);
                if(res.data === 'Success'){
                    AsyncStorage.setItem("partakeCredentials", username);
                    navigation.navigate('CreateProfile');
                    //Store username for future use
                    localStorage.setItem("username", username);
                } else{
                    alert("Unable to register. There may already be a user registered with this email.");
                }
            }).catch(err=>console.log(err));
        } else{
            alert("Passwords don't match");
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logomark width={(windowWidth/1.618)+26} height='100%'/>
            </View>
            <View style={styles.authInputContainer}>
                <TextInput
                    style={styles.authInput}
                    value={username}
                    placeholder='Email'
                    placeholderTextColor={colors.grayInactive}
                    onChangeText={(username) => setUsername(username)}
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
            <View style={styles.authInputContainer}>
                <TextInput
                    style={styles.authInput}
                    value={repeatPassword}
                    placeholder='Repeat password'
                    placeholderTextColor={colors.grayInactive}
                    secureTextEntry={true}
                    onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                />
            </View>
            <Button onPress={() => { register() }} text={'Sign up'} width={(windowWidth/1.618)}/>

            <View style={styles.inlineContainer}>
                <Text style={styles.inlineLabel}>
                    Already a user?{'\u00A0'}
                </Text>
                <InlineButton onPress={() => navigation.navigate('Login')} text={'Log in.'} />
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
}

export default Register;