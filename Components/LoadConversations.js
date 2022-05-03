import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 0,
        paddingRight: 15,
        paddingBottom: 21,
        paddingLeft: 16,
    },
    profilePicture: {
        marginRight: 13,
    },
    labelName: {
        color: colors.grayActive,
        fontFamily: 'Arial',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        paddingRight: 0,
        paddingLeft: 0,
    },
    labelPreview: {
        color: colors.grayInactive,
        fontFamily: 'Arial',
        fontSize: 15,
        paddingBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    altContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: colors.grayActive,
    }
});

const LoadConversations = ({ navigation, route }) => {

    const photos = [
        require('../assets/don-delfin-espino-nBywXevf_jE-unsplash-min-3.jpg'), 
        require('../assets/aleksander-borzenets-ozda-XbeP0k-unsplash-min.jpg'), 
        require('../assets/austin-wade-ex6qfO4TPMY-unsplash-min.jpg'), 
        require('../assets/austin-wade-X6Uj51n5CE8-unsplash-min.jpg'), 
        require('../assets/caique-silva-3ujVzg9i2EI-unsplash-min.jpg'), 
        require('../assets/caique-silva-S409PylpOiQ-unsplash-min.jpg'), 
        require('../assets/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash-min.jpg'), 
        require('../assets/eduardo-dutra-ZHy0efLnzVc-unsplash-min.jpg'), 
        require('../assets/gift-habeshaw-dlbiYGwEe9U-unsplash-min.jpg'), 
        require('../assets/guilherme-stecanella-_dH-oQF9w-Y-unsplash-min.jpg'),
        require('../assets/henri-pham-Ml4tr2WO7JE-unsplash-min.jpg'),
        require('../assets/jonathan-borba-n1B6ftPB5Eg-unsplash-min.jpg'),
        require('../assets/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash-min.jpg'),
        require('../assets/nico-marks-mFcc5b_t74Q-unsplash-min.jpg'),
        require('../assets/sirio-Ty4f_NOFO60-unsplash-min.jpg'),
        require('../assets/stephanie-cook-NDCy2-9JhUs-unsplash-min.jpg'),
        require('../assets/teymi-townsend-AvLHH8qYbAI-unsplash-min.jpg'),
        require('../assets/tyler-nix-ZGa9d1a_4tA-unsplash-min.jpg'),
        require('../assets/venrick-azcueta-Sl15cCSOtYQ-unsplash-min.jpg'),
        require('../assets/wesley-tingey-TvPCUHten1o-unsplash-min.jpg')
    ];

    const [conversations, setConversations] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [newName, setNewName] = useState('');
    const [user, setUser] = useState();

    const loadConversations = (uname) => {
        var axios = require('axios');
        let formData = new FormData();
        let allConvos = [];

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/conversations.php', formData)
            .then(res=>{
                const convos = res.data.split("\n");
                convos.pop();
                for(let i = 0; i < convos.length; i++){
                    let tempConvo = {}
                    let convoParts = convos[i].split("~");
                    let convoId = convoParts[0];
                    let convoNames = convoParts[1];
                    let convoPic = convoParts[2];
                    tempConvo.convoId = convoId;
                    tempConvo.names = convoNames;
                    tempConvo.pic = convoPic;
                    allConvos.push(tempConvo);
                }
                setConversations(allConvos);
            }).catch(err=>console.log(err));
    };

    const getID = () => {
        var axios = require('axios');
        let formData = new FormData();
  
        formData.append('username', username);
        axios.post('http://23.22.183.138:8806/getID.php', formData)
        .then((res) => {
          setUser(Number(res.data));
          setIsLoaded(true);
        })
        .catch(err=>console.log(err));
    };

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((gotItem) => {
            setUsername(gotItem);
            return gotItem;
        })
        .then((uname) => {
            loadConversations(uname);
        })
        .then(() => {
            getID();
        })
        .catch((error) => console.log(error))
    }, [user]);

    const addToGroup = (convoID) => {
        var axios = require('axios');
        let formData = new FormData();

        formData.append('name', newName);
        formData.append('convoID', convoID);

        axios.post('http://23.22.183.138:8806/addToGroup.php', formData)
        .then(res=>{
            console.log(res.data);
        }).catch(err=>console.log(err));

    }

    if(!isLoaded) {
        return(
            <View style={[styles.loadingContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color={colors.blue} />
            </View>
        );
    }
    else if (conversations.length != 0) {
        return conversations.map((convo) => {
            return(
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity key={convo.convoId} 
                        style={styles.messageContainer}
                        onPress={() => {navigation.navigate({name: 'Chat', params: {convoID: convo.convoId, username: username, userID: user, pic: convo.pic}});}}>
                        <View style={styles.profilePicture}>
                            <Image source={photos[convo.pic]} style={{width: 81, height: 81, borderRadius: 100 / 2}}/>
                        </View>
                        <View>
                            <Text style={styles.labelName}>{convo.names}</Text>
                            <Text style={styles.labelPreview}>Test</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
    }
    else {
        return (
            <View style={styles.altContainer}>
                <Text style={styles.defaultText}>You have no conversations.</Text>
            </View>
        )
    }
};

export default LoadConversations;