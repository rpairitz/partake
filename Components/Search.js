import React, { useRef, useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper'
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

    const useSwiper = useRef(null).current;

    const [rankedUsers, setRankedUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [userID, setUserID] = useState();
    const [count, setCount] = useState();

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
            allUsers.pop();
            for(let i = 0; i < allUsers.length; i++) {
                const random = Math.floor(Math.random() * (photos.length - 1));
                const randomImage = photos[count + 1];
                let tempUser = {};
                let data = allUsers[i].split(",");
                let hobbyCount = parseInt(data[0]);
                let hobbies = [];
                for(let j = 0; j < hobbyCount; j++){
                    hobbies.push(data[j+1]);
                }
                tempUser.hobbies = hobbies;
                tempUser.id = data[hobbyCount+1];
                tempUser.name = data[hobbyCount+2];
                tempUser.bio = data[hobbyCount+3];
                tempUser.photo = photos[Number(data[data.length - 1])];
                users.push(tempUser);
            }
            setRankedUsers(users);
            setIsLoaded(true);
            var tempCount = count + 1;
            setCount(tempCount);
        }).catch(err=>console.log(err));
    };

    useEffect(() => {
        setCount(-1);
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