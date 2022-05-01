import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text
} from 'react-native';
import EditProfileCard from './EditProfileCard';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/Search.styles'

const Profile = ({ navigation, route }) => {

    const useSwiper = useRef(null).current

    const[email, setEmail] = useState('');

    const[card, setCard] = useState([{
        "bio": "Fuck you, bitch",
        "key": "",
        "name": "",
        "photo": require('../assets/profile.png')
    }]);
    
    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((loggedIn) => {
            if(loggedIn !== ""){
                setEmail(loggedIn);
                var axios = require('axios');
                let formData = new FormData();
                //let formData = new URLSearchParams();
                formData.append('email', email);
                axios.post('http://23.22.183.138:8806/getProfile.php', formData)
                .then(res=>{ 
                    console.log(res.data);
                    var data = res.data.split("~");
                    console.log("Name: " + data[0]);
                    uName = {"name":data[0]};
                    uKey = {"key":data[1]};
                    uBio = {"bio":data[2]};
                    setCard(card => ([{
                        ...card[0],
                        ...uName,
                    }]));
                    setCard(card => ([{
                        ...card[0],
                        ...uKey,
                    }]));
                    setCard(card => ([{
                        ...card[0],
                        ...uBio,
                    }]));
            
                }).catch(err=>console.log(err));
            }
        });
    }, [email])
    
    return(
        <View style={styles.container}>
            <View style={styles.swiperContainer}>
                <Swiper
                ref={useSwiper}
                animateCardOpacity
                containerStyle={styles.container}
                cards={card}
                renderCard={card => <EditProfileCard card={card} navigation={navigation} />}
                cardIndex={0}
                backgroundColor="white"
                stackSize={1}
                horizontalSwipe={false}
                verticalSwipe={false}
                infinite
                showSecondCard
                animateOverlayLabelsOpacity
                />
            </View>
        </View>
    );

}

export default Profile;