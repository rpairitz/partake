import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Touchable } from 'react-native';
import colors from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
 
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    hobbies: {
        padding: 10
    },
    labelText: {
        color: colors.blue,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

// placeholder for forums screen
const Forums = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [allHobbies, setAllHobbies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((loggedIn) => {
            setEmail(JSON.parse(loggedIn));
            var axios = require('axios');
            let formData = new FormData();
            formData.append('email', email);
            axios.post('http://23.22.183.138:8806/getForumHobbies.php', formData)
            .then(res=>{ 
                let hobbies = [];
                var data = res.data.split("\n");
                data.pop();
                console.log(data);
                for(let i=0; i < data.length; i++){
                    let tempHobby = {};
                    let hobbyParts = data[i].split("~");
                    tempHobby.id = hobbyParts[0];
                    tempHobby.name = hobbyParts[1];
                    tempHobby.icon = hobbyParts[2];
                    hobbies.push(tempHobby);
                }
                console.log(hobbies);
                setAllHobbies(hobbies);
                setIsLoaded(true);
            }).catch(err=>console.log(err));
        });
    }, [email])

    if(!isLoaded) {
        return(
            <View style={[styles.loadingContainer, styles.horizontal]}>
              <ActivityIndicator size="large" color="#75d2ff" />
            </View>
        );
    }
    else {
        if(allHobbies.length == 0){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    }}>
    
                    <Text style={{fontFamily: 'Arial', fontSize: 13, color: colors.grayActive}}>Forums not yet available.</Text>
                </View>
            );
        } else{
            return allHobbies.map((hobby) => {
                return(
                    <Card>
                        <TouchableOpacity onPress={() => {navigation.navigate({name: 'HobbyPosts', params: {hobbyID: hobby.id, name: hobby.name}});}}>
                            <Text key={hobby.id} style={styles.labelText}>{hobby.name} {String.fromCodePoint(hobby.icon)}</Text>
                        </TouchableOpacity>
                    </Card>
                );
            });
        }
    }
};

export default Forums;