import React, { useRef } from 'react'
import { View } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import photoCards from '../photoCards'
import Card from './Card'
import OverlayLabel from './OverlayLabel'
import styles from '../styles/Search.styles'

const Search = ({ navigation, route }) => {

    const useSwiper = useRef(null).current
  
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