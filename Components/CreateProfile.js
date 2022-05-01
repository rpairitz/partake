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
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


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
        fontFamily: 'Avenir',
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
        fontFamily: 'Avenir'
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
    content: {
        flex: 5, 
        alignItems: 'center', 
        paddingTop: 10
    }
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
                    navigation.navigate('Home');
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
        <View style={{flex: 1, paddingTop: 15}}>
            <View style={styles.container}>
            {image && <Image 
                    source={image ? {uri:image} : require('../assets/profile.png')}
                    style={{width: 100, height: 100, borderRadius: 100/ 2}} 
            />}
            </View>
            <View style={styles.content}>
                <TouchableOpacity>
                    <Text onPress={() => {handleChoosePhoto()}} style={{ fontFamily: 'Avenir' }}>Upload Profile Picture</Text>
                </TouchableOpacity>
                <View style={{ paddingTop: 20 }}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={firstName}
                            placeholder='First Name'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={lastName}
                            placeholder='Last Name'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(lastName) => setLastName(lastName)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={bio}
                            placeholder='Bio'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(bio) => setBio(bio)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={zipCode}
                            placeholder='Zip Code'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(zipCode) => setZipCode(zipCode)}
                        />
                    </View>
                </View>
                <Text style={{ fontFamily: 'Avenir', fontSize: 16, paddingBottom: 8}}>Hobbies</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.tag}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 11}}>&nbsp;Soccer</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity style={[styles.tag, {backgroundColor: '#9fa4d0'}]}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 11}}>&nbsp;Painting</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity style={[styles.tag, {backgroundColor: '#d7b1cd'}]}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 11}}>&nbsp;Poetry</Text>
                    </TouchableOpacity>
                    <Text style={{marginBottom: 15}}>{'\n'}</Text>
                </View>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#75d2ff', '#96a9d5', '#9fa4d0', '#bfa8e0', '#d7b1cd']}
                    start={[0, 1]} 
                    end={[1, 0]}
                    style={styles.loginBtn}>
                        <TouchableOpacity onPress={() => {createProfile(); navigation.navigate('AddHobby')}} style={styles.loginBtn}>
                            <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 14, fontWeight: 'bold'}}>Continue</Text>
                        </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );

}

export default CreateProfile;