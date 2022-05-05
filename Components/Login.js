import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Logomark from '../img/logo_logomark.svg';
import colors from '../styles/theme';
import InlineButton from './InlineButton';
import Button from './Button';
import HideKeyboard from './HideKeyboard';
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

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((loggedIn) => {
          if(!loggedIn){
            console.log('no state');
          } else{
                AsyncStorage.getItem('profFlag')
                .then((created) => {
                if(!created){
                    navigation.navigate('CreateProfile');
                    alert("Before you can Partake, we still need some user information from you");
                } else{
                    AsyncStorage.getItem('hobbyFlag')
                    .then((hobbied) => {
                    if(!hobbied){
                        console.log('no hobbies');
                        navigation.navigate('AddHobby');
                        alert("Before you can Partake, we need to know your hobbies");

                    }
                    });
                }
                });
            }
        });
      }, [])

    const login = () => {
        var axios = require('axios');
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        axios.post('http://23.22.183.138:8806/login.php', formData)
            .then(res=>{ 
                console.log(res.data);
                if(res.data === 'Success'){
                    AsyncStorage.setItem("partakeCredentials", JSON.stringify(email));
                    navigation.navigate('Home');
                    setEmail('');
                    setPassword('');
                } else if(res.data === 'User'){
                    alert("This email does not have an account associated with it. Please register before continuing.");
                } else if(res.data === 'Password'){
                    alert("Incorrect password.")
                }
            }).catch(err=>console.log(err));
        }

    return(
        <HideKeyboard>
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
        </HideKeyboard>
    );
}

export default Login;