import React, { useState } from 'react'
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
    const [birthday, setBirthday] = useState('');
    const [bio, setBio] = useState('');

    return(
        <View style={{flex: 1, paddingTop: 15}}>
            <View style={styles.container}>
                <Image 
                    source={require('../assets/teymi-townsend-AvLHH8qYbAI-unsplash.jpg')}  
                    style={{width: 100, height: 100, borderRadius: 100/ 2}} 
                />
            </View>
            <View style={styles.content}>
                <TouchableOpacity>
                    <Text style={{ fontFamily: 'Avenir' }}>Edit</Text>
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
                            value={birthday}
                            placeholder='Birthday'
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(birthday) => setBirthday(birthday)}
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
                    onPress={() => navigation.navigate('Home')}
                    style={styles.loginBtn}>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={styles.loginText}>Save Changes</Text>
                        </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );

}

export default CreateProfile;