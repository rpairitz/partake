import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';
import colors from '../styles/theme';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        fontFamily: 'Arial',
        fontWeight: 'bold'
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
        fontFamily: 'Arial'
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
      },
    tag: {
        borderRadius: 14,
        width: 90,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#75d2ff',
        justifyContent: 'center'
    },
    labelText: {
        color: colors.blue,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },
    content: {
        flex: 5, 
        alignItems: 'center', 
        paddingTop: 10
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
});

const CreateProfile = ({ navigation, route }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials').
        then((gotItem) => {
            setUsername(gotItem);
        })
        .catch((error) => console.log(error))
    }, [username]);
    
    const createProfile = () => {
        if(!firstName || !lastName || !zipCode || !bio) {
            alert('One or more fields is missing. Please fill out all fields.');
        }
        var axios = require('axios');
        let formData = new FormData();
        //let formData = new URLSearchParams();
        var fullName = firstName + ' ' + lastName;
        //Decrypt username for use in query
        console.log("Testing AsyncStorage:" + username);
        formData.append('username', username);
        formData.append('name', fullName);
        formData.append('bio', bio);
        formData.append('zipCode', zipCode);
        axios.post('http://23.22.183.138:8806/createProfile.php', formData)
            .then(res=>{ 
                console.log(res.data);
                if(res.data === 'Success'){
                    navigation.navigate('AddHobby');
                } else{
                    alert("Failed to register.");
                }
            }).catch(err=>console.log(err));
    } 

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if(!result.cancelled){
            setImage(result.uri);
        }
    };
    

    return(
        <View style={{flex: 1, paddingTop: 30}}>
            <View style={styles.container}>
            {image && <Image 
                    source={image ? {uri:image} : require('../assets/profile.png')}
                    style={{width: 100, height: 100, borderRadius: 100/ 2}} 
            />}
            </View>
            <View style={styles.content}>
                <TouchableOpacity>
                    <Text onPress={() => {handleChoosePhoto()}} style={styles.labelText}>Upload Profile Picture</Text>
                </TouchableOpacity>
                <View style={{ paddingTop: 30 }}>
                    <View style={styles.authInputContainer}>
                        <TextInput
                            style={styles.authInput}
                            value={firstName}
                            placeholder='First Name'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />
                    </View>
                    <View style={styles.authInputContainer}>
                        <TextInput
                            style={styles.authInput}
                            value={lastName}
                            placeholder='Last Name'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(lastName) => setLastName(lastName)}
                        />
                    </View>
                    <View style={styles.authInputContainer}>
                        <TextInput
                            style={styles.authInput}
                            value={bio}
                            placeholder='Bio'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(bio) => setBio(bio)}
                        />
                    </View>
                    <View style={styles.authInputContainer}>
                        <TextInput
                            style={styles.authInput}
                            value={zipCode}
                            placeholder='Zip Code'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(zipCode) => setZipCode(zipCode)}
                        />
                    </View>
                </View>
                <Text>{'\n'}</Text>
                <Button onPress={() => {createProfile(); navigation.navigate('AddHobby')}} text={'Continue'} width={(windowWidth/1.618)}/>
                {/* <LinearGradient
                    // Button Linear Gradient
                    colors={['#75d2ff', '#96a9d5', '#9fa4d0', '#bfa8e0', '#d7b1cd']}
                    start={[0, 1]} 
                    end={[1, 0]}
                    style={styles.loginBtn}>
                        <TouchableOpacity onPress={() => {createProfile(); navigation.navigate('AddHobby')}} style={styles.loginBtn}>
                            <Text style={{color: 'white', fontFamily: 'Arial', fontSize: 14, fontWeight: 'bold'}}>Continue</Text>
                        </TouchableOpacity>
                </LinearGradient> */}
            </View>
        </View>
    );

}

export default CreateProfile;