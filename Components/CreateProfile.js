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
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/theme';
import HobbyTag from './HobbyTag';
import ProfilePlaceholder from '../img/logo_profile-placeholder.svg';
import InlineButton from './InlineButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
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
    inputContainer: {
        borderRadius: 13,
        padding: 13,
        marginBottom: 13,
        borderWidth: 0.618,
        borderColor: colors.grayInactive
      },
      input: {
        width: (windowWidth-42-26),
        fontSize: 13,
        textAlign: 'left',
        fontFamily: 'Arial',
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
    },
    hobbiesContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    labelContainer: {
        width: windowWidth - 42,
        padding: 13,
    },
    label: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 13,
        color: colors.grayActive,
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
        <SafeAreaView style={styles.container}>
            <View style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'flex-start',
                }}>
                <TouchableOpacity style={styles.labelContainer}>
                    <Text onPress={() => {handleChoosePhoto()}} style={styles.label}>Profile Picture</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',alignSelf: 'center',}}>
            {image ? (<Image 
                    source={image ? {uri:image} : require('../assets/profile.png')}
                    style={{width: 89, height: 89, borderRadius: 89}}/> )
                :(
                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => { handleChoosePhoto() }}
                            >
                                <ProfilePlaceholder width={89} height={89} />
                            </TouchableOpacity>
                )
            }
            <View style={{alignSelf: 'center'}}>
                <InlineButton text='Edit' onPress={() => {handleChoosePhoto()}}/></View>
            </View>
            <View>
                <View style={{ paddingTop: 20 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            placeholder='First name'
                            placeholderTextColor={colors.grayInactive}
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            placeholder='Last name'
                            placeholderTextColor={colors.grayInactive}
                            onChangeText={(lastName) => setLastName(lastName)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={bio}
                            placeholder='Bio'
                            placeholderTextColor={colors.grayInactive}
                            onChangeText={(bio) => setBio(bio)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={zipCode}
                            placeholder='Zip code'
                            placeholderTextColor={colors.grayInactive}
                            onChangeText={(zipCode) => setZipCode(zipCode)}
                        />
                    </View>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Hobbies</Text>
                </View>
                <View style={styles.hobbiesContainer}>
                    {['Soccer', 'Painting', 'Poetry'].map((hobby, key) => (
                        <HobbyTag hobby={hobby} id={key} />
                    ))}
                    {/* <TouchableOpacity style={styles.tag}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Arial', fontSize: 11}}>&nbsp;Soccer</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity style={[styles.tag, {backgroundColor: '#9fa4d0'}]}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Arial', fontSize: 11}}>&nbsp;Painting</Text>
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <TouchableOpacity style={[styles.tag, {backgroundColor: '#d7b1cd'}]}>
                        <Ionicons name="close-outline" size="14px" color="#ffffff" />
                        <Text style={{color: 'white', fontFamily: 'Arial', fontSize: 11}}>&nbsp;Poetry</Text>
                    </TouchableOpacity>
                    <Text style={{marginBottom: 15}}>{'\n'}</Text> */}
                </View>
            </View>
            </View>
                <View style={{bottom: 0,alignSelf: 'center'}} width={windowWidth/1.618}>
                    <Button onPress={() => {createProfile(); navigation.navigate('AddHobby')}} text={'Continue'} width={(windowWidth/1.618)}/>
                </View>
        </SafeAreaView>
    );

}

export default CreateProfile;