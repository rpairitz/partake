import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import EditProfileCard from './EditProfileCard';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/theme';

const styleSheet = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

const Profile = ({ navigation, route }) => {

    const useSwiper = useRef(null).current

    const[email, setEmail] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const[card, setCard] = useState([{}]);
    
    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((loggedIn) => {
            if(loggedIn !== ""){
                setEmail(JSON.parse(loggedIn));
                var axios = require('axios');
                let formData = new FormData();
                formData.append('email', email);
                axios.post('http://23.22.183.138:8806/getProfile.php', formData)
                .then(res=>{ 
                    var data = res.data.split("~");
                    let tempUser = {};
                    tempUser.name = data[0];
                    tempUser.key = data[1];
                    tempUser.bio = data[2];
                    let hobbies = [];
                    for(let i=3; i < data.length; i++){
                        hobbies.push(data[i]);
                    }   
                    hobbies.pop();
                    tempUser.hobbies = hobbies;
                    let crdArray = [tempUser];
                    setCard(crdArray);
                    setIsLoaded(true);
                }).catch(err=>console.log(err));
            }
        });
    }, [email])
    
    if(!isLoaded) {
        return(
            <View style={[styleSheet.loadingContainer, styleSheet.horizontal]}>
              <ActivityIndicator size="large" color={colors.lavender} />
            </View>
        );
    }
    else {
        return(
            <View style={{backgroundColor: colors.white, flex: 1,}}>
                <Swiper
                    ref={useSwiper}
                    animateCardOpacity
                    cards={card}
                    renderCard={card => <EditProfileCard card={card} navigation={navigation} />}
                    cardIndex={0}
                    backgroundColor="white"
                    stackSize={1}
                    horizontalSwipe={false}
                    verticalSwipe={false}
                    infinite
                    showSecondCard={false}
                    cardHorizontalMargin={0}
                    cardVerticalMargin={8}
                    animateOverlayLabelsOpacity
                />
            </View>
        );
    }
}

export default Profile;