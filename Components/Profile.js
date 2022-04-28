import React, { useRef } from 'react'
import {
    View,
    Text
} from 'react-native';
import EditProfileCard from './EditProfileCard';
import Swiper from 'react-native-deck-swiper';

import styles from '../styles/Search.styles'

const card = [{
    "age": 21,
    "bio": "Looking for something to form a band with.",
    "key": "Mji2nfNfD87",
    "name": "Maggie Farrell",
    "photo": require('../assets/teymi-townsend-AvLHH8qYbAI-unsplash.jpg')
}];

const Profile = ({ navigation, route }) => {

    const useSwiper = useRef(null).current

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