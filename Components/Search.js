import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import Card from './Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/theme';
import CancelIcon from '../img/icon_cancel.svg';
import RecruitIcon from '../img/icon_recruit.svg';

const windowHeight = Dimensions.get('window').height;

const styleSheet = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.white
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    swipeLabelContainer: {
        padding: 21,
        borderWidth: 3,
        borderColor: colors.grayInactive,
        borderRadius: 100,
        height: 100,
        width: 100,
    },
    swipeLabel: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 34,
        color: colors.grayInactive
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

        var userSwipedOn = rankedUsers[card].id;
        let liked = 1;
        var userSwiping = userID;

        formData.append('userSwipedOn', userSwipedOn);
        formData.append('userSwiping', userSwiping);
        formData.append('liked', liked);

        axios.post('http://23.22.183.138:8806/likedUser.php', formData)
        .then(res => {
            console.log(res.data);
            var axios2 = require('axios');
            let formData2 = new FormData();
            formData2.append('userSwipedOn', userSwipedOn);
            formData2.append('userSwiping', userSwiping);
            axios2.post('http://23.22.183.138:8806/matchUser.php', formData2).then(res2 =>
            {
                console.log(res2.data);
            })
            .catch(err=>console.log(err));
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
                if(!tempUser.photo){
                    tempUser.photo = require("../assets/profile.png");
                }
                users.push(tempUser);
            }
            setRankedUsers(users);
            setIsLoaded(true);
        }).catch(err=>console.log(err));
    };

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials')
        .then((gotItem) => {
            var gotItem = JSON.parse(gotItem);
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
                    cards={rankedUsers}
                    renderCard={card => <Card card={card} />}
                    cardIndex={0}
                    backgroundColor={colors.white}
                    stackSize={2}
                    infinite
                    showSecondCard={true}
                    cardHorizontalMargin={0}
                    cardVerticalMargin={8}
                    onSwipedLeft={(card) => handleSwipedLeft(card)}
                    onSwipedRight={(card) => handleSwipedRight(card)}
                    animateOverlayLabelsOpacity
                    overlayLabels={{
                        left: {
                        title: 'NOPE',
                        // element: <OverlayLabel label="NO THANKS" color={colors.grayActive} />,
                        element: <CancelIcon width={55} height={55}/>,
                        style: {
                            wrapper: {
                                position: 'absolute',
                                alignItems: 'flex-end',
                                top: 34,
                                right: 8+21,
                                },
                        },
                        },
                        right: {
                        title: 'LIKE',
                        // element: <OverlayLabel label="RECRUIT" color={colors.orchid} />,
                        element: 
                            <RecruitIcon width={89} height={89} gradStart={colors.iceBlue} gradEnd={colors.orchid}/>
                        ,
                        style: {
                            wrapper: {
                            position: 'absolute',
                            alignItems: 'flex-start',
                            top: 34-21,
                            left: 8+8,
                            },
                        },
                        },
                    }}
                    />
            </View>
        );
    }
}

export default Search;