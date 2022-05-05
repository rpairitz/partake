import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient';
import { shape, string } from 'prop-types'
import styles from '../styles/Card.styles'
import colors from '../styles/theme';
import RecruitIcon from '../img/icon_recruit.svg';
import InlineButton from './InlineButton';
import HobbyTag from './HobbyTag';

const Card = ({ card }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    
    <Image
      style={styles.image}
      source={card.photo}
      resizeMode="cover"
    />
  
    <View style={styles.photoDescriptionContainer}>
      <View style={styles.hobbiesContainer}>
        {card.hobbies.map((hobby,key) => (
          <HobbyTag hobby={hobby.name} id={key} icon={hobby.icon}/>
        ))}
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {`${card.name.split(' ')[0]}`}
          </Text>
          <Text style={styles.bio}>
            {`${card.bio}`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.recruitButtonContainer}>
          <View style={styles.recruitButton}>
            <RecruitIcon width={55} height={55} gradStart={colors.iceBlue} gradEnd={colors.orchid}/>
          </View>
          <InlineButton text='Recruit' style={{fontStyle: 'italic', fontSize: 15}}/>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    name: string,
    bio: string
  }).isRequired,
}
export default Card;