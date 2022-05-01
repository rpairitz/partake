import React, { useRef, useEffect, useState } from 'react'
import { View } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import photoCards from '../assets/photoCards'
import Card from './Card'
import OverlayLabel from './OverlayLabel'
import styles from '../styles/Search.styles'

const Search = ({ navigation, route }) => {

    const useSwiper = useRef(null).current;
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        var loadedUsers = [];
        var axios = require('axios');
        axios.get('http://23.22.183.138:8806/loadUsers.php')
        .then((res) => {
            const allUsers = res.data.split("\n");
            allUsers.pop();
            for(let i = 0; i < allUsers.length; i++) {
                let tempUser = {};
                let data = allUsers[i].split("~");
                tempUser.id = data[0];
                tempUser.name = data[1];
                tempUser.bio = data[2];
                tempUser.photo = require('../assets/don-delfin-espino-nBywXevf_jE-unsplash.jpg')
                loadedUsers.push(tempUser);
            }
            setUsers(loadedUsers);
        })
        .catch(err=>console.log(err));
    };

    useEffect(() => {
        loadUsers();
    }, []);
  
    return(
        <View
        style={styles.container}
        >
            <View style={styles.swiperContainer}>
                <Swiper
                ref={useSwiper}
                animateCardOpacity
                containerStyle={styles.container}
                cards={photoCards}
                renderCard={card => <Card card={card} />}
                cardIndex={0}
                backgroundColor="white"
                stackSize={2}
                infinite
                showSecondCard
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

export default Search;