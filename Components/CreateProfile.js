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
            setUsername(JSON.parse(gotItem));
        })
        .catch((error) => console.log(error))
    }, [username]);
    
    const createProfile = () => {
        if(!firstName || !lastName || !zipCode || !bio) {
            alert('One or more fields is missing. Please fill out all fields.');
        } else{
            var axios = require('axios');
            let formData = new FormData();
            //let formData = new URLSearchParams();
            var profFlag = true;
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
                        AsyncStorage.setItem("profFlag", JSON.stringify(profFlag));
                        navigation.navigate('AddHobby');
                    } else{
                        alert("Failed to register.");
                    }
                }).catch(err=>console.log(err));
        }
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
                    <Text onPress={() => {handleChoosePhoto()}} style={{ fontFamily: 'Arial' }}>Upload Profile Picture</Text>
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
                <Text style={{ fontFamily: 'Arial', fontSize: 16, paddingBottom: 8}}></Text>
                <Text style={{ fontFamily: 'Arial', fontSize: 16, paddingBottom: 8}}></Text>
                <Button onPress={() => {createProfile()}} text={'Continue'} width={(windowWidth/1.618)}/>
            </View>
        </View>
    );

}

export default CreateProfile;