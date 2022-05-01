import React, { useRef, useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import photoCards from '../assets/photoCards'
import Card from './Card'
import OverlayLabel from './OverlayLabel'
import styles from '../styles/Search.styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Search = ({ navigation, route }) => {

    const useSwiper = useRef(null).current;

    const [rankedUsers, setRankedUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [userID, setUserID] = useState();

    const getID = () => {
        var axios = require('axios');
        let formData = new FormData();
  
        formData.append('username', username);
        axios.post('http://23.22.183.138:8806/getID.php', formData)
        .then((res) => {
          setUserID(res.data);
        })
        .catch(err=>console.log(err));
    };

    const handleSwipedRight = (card) => {
        var axios = require('axios');
        let formData = new FormData();

        let userSwipedOn = rankedUsers[card].id;
        let liked = 1;
        let userSwiping = userID;

        formData.append('userSwipedOn', userSwipedOn);
        formData.append('userSwiping', userSwiping);
        formData.append('liked', liked);

        axios.post('http://23.22.183.138:8806/likedUser.php', formData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err=>console.log(err));
    };

    const handleSwipedLeft = (card) => {
        var axios = require('axios');
        let formData = new FormData();

        let userSwipedOn = rankedUsers[card].id;
        let liked = 0;
        let userSwiping = userID;

        formData.append('userSwipedOn', userSwipedOn);
        formData.append('userSwiping', userSwiping);
        formData.append('liked', liked);

        axios.post('http://23.22.183.138:8806/likedUser.php', formData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err=>console.log(err));

    };

    const rankUsers = (uname) => {
        var axios = require('axios');
        let formData = new FormData();
        var users = [];

        formData.append('username', uname);

        axios.post('http://23.22.183.138:8806/rankUser.php', formData)
        .then(res=>{
            var allUsers = res.data.split("\n");
            for(let i = 0; i < allUsers.length; i++) {
                let tempUser = {};
                let data = allUsers[i].split(",");
                tempUser.id = data[0];
                tempUser.name = data[1];
                tempUser.bio = data[2];
                tempUser.photo = require('../assets/don-delfin-espino-nBywXevf_jE-unsplash-min-3.jpg')
                users.push(tempUser);
            }
            setRankedUsers(users);
            setIsLoaded(true);
        }).catch(err=>console.log(err));
    };

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((gotItem) => {
            setUsername(gotItem);
            return gotItem;
        })
        .then((uname) => {
            rankUsers(uname);
        })
        .then(() => {
            getID();
        })
        .catch((error) => console.log(error))
    }, [rankedUsers.length]);
  
    if(!isLoaded) {
        return(
            <View style={[styleSheet.loadingContainer, styleSheet.horizontal]}>
              <ActivityIndicator size="large" color="#75d2ff" />
            </View>
        );
    }
    else {
        return(
            <View style={styles.container}>
                <View style={styles.swiperContainer}>
                    <Swiper
                    ref={useSwiper}
                    animateCardOpacity
                    containerStyle={styles.container}
                    cards={rankedUsers}
                    renderCard={card => <Card card={card} />}
                    cardIndex={0}
                    backgroundColor="white"
                    stackSize={2}
                    infinite
                    showSecondCard
                    onSwipedLeft={(card) => handleSwipedLeft(card)}
                    onSwipedRight={(card) => handleSwipedRight(card)}
                    animateOverlayLabelsOpacity
                    overlayLabels={{
                        left: {
                        title: 'NOPE',
                        element: <OverlayLabel label="NOPE" color="#d7b1cd" />,
                        style: {
                            wrapper: styles.overlayWrapper,
                        },
                        },
                        right: {
                        title: 'LIKE',
                        element: <OverlayLabel label="LIKE" color="#75d2ff" />,
                        style: {
                            wrapper: {
                            ...styles.overlayWrapper,
                            alignItems: 'flex-start',
                            marginLeft: 30,
                            },
                        },
                        },
                    }}
                    />
                </View>
            </View>
        );
    }
}

export default Search;