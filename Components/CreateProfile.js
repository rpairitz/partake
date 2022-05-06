import React, { useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';
import colors from '../styles/theme';
// import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import HobbyTag from './HobbyTag';
import ProfilePlaceholder from '../img/logo_profile-placeholder.svg';
import InlineButton from './InlineButton';
import Header from './Header';

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
        marginBottom: 5,
        borderWidth: 0.618,
        borderColor: colors.grayInactive
    },
    input: {
        width: (windowWidth - 42 - 26),
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
    // labelText: {
    //     color: colors.blue,
    //     fontFamily: 'Arial',
    //     fontWeight: 'bold',
    //     fontSize: 14,
    //     padding: 8,
    //     paddingLeft: 5,
    //     paddingRight: 5,
    // },
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
        width: '100%',
        padding: 13,
        paddingTop: 8,
        paddingBottom: 8,
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
                setUsername(JSON.parse(gotItem));
            })
            .catch((error) => console.log(error))
    }, [username]);

    const createProfile = () => {
        if (!firstName || !lastName || !zipCode || !bio) {
            alert('One or more fields is missing. Please fill out all fields.');
        } else {
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
                .then(res => {
                    console.log(res.data);
                    if (res.data === 'Success') {
                        AsyncStorage.setItem("profFlag", JSON.stringify(profFlag));
                        navigation.navigate('AddHobby');
                    } else {
                        alert("Failed to register.");
                    }
                }).catch(err => console.log(err));
        }
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleCancel = () => {
        setBio('');
        setFirstName('');
        setLastName('');
        setImage(null);
        setUsername('');
        setZipCode('');
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView style={{ backgroundColor: colors.white, flex: 1 }} behavior="padding">
            {/* <SafeAreaView edges={['top']} style={{ height: 89, zIndex: 99999, borderBottomColor: colors.grayInactive, borderBottomWidth: 0.38, marginBottom: 21 }}>
            </SafeAreaView> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Header text={'Create Profile'} displayBack={true} onPressBack={handleCancel} />
                    <ScrollView contentContainerStyle={{ flex: 1, margin: 21 }}>
                        <View style={{
                            alignSelf: 'center',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}>
                                <View style={[styles.labelContainer, { flex: 1, maxWidth: (windowWidth / 3) - 13, }]}>
                                    <Text style={styles.label}>Profile Picture</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 5 }} onPress={() => { handleChoosePhoto() }}
                                    >
                                        {image ? (<Image
                                            source={image ? { uri: image } : require('../assets/profile.png')}
                                            style={{ width: 89, height: 89, borderRadius: 89 }} />)
                                            : (
                                                <ProfilePlaceholder width={89} height={89} />
                                            )
                                        }
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'center' }}>
                                        <InlineButton text='Edit' onPress={() => { handleChoosePhoto() }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Name</Text>
                                    </View>
                                    <View style={[styles.inputContainer, { marginBottom: 13 }]}>
                                        <TextInput
                                            style={styles.input}
                                            value={firstName}
                                            placeholder="First"
                                            placeholderTextColor={colors.grayInactive}
                                            onChangeText={(firstName) => setFirstName(firstName)}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            value={lastName}
                                            placeholder="Last"
                                            placeholderTextColor={colors.grayInactive}
                                            onChangeText={(lastName) => setLastName(lastName)}
                                        />
                                    </View>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Zip Code</Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            value={zipCode}
                                            onChangeText={(zipCode) => setZipCode(zipCode)}
                                        />
                                    </View>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Bio</Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={[styles.input, { overflow: 'scroll', height: 89, alignSelf: 'flex-start' }]}
                                            value={bio}
                                            multiline={true}
                                            onChangeText={(bio) => setBio(bio)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            <SafeAreaView style={{
                position: 'absolute', bottom: 0, alignSelf: 'center', width: windowWidth,
                backgroundColor: colors.white,
                paddingTop: 13, borderTopColor: colors.grayInactive, borderTopWidth: 0.62,
            }}
                edges={['bottom']}>
                <Button onPress={() => { createProfile(); navigation.navigate('AddHobby') }} text={'Continue'} width={(windowWidth / 1.618)} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default CreateProfile;