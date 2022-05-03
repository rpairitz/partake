import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { shape, string, number } from 'prop-types'
import HobbyTag from './HobbyTag';
import styles from '../styles/Card.styles'
import colors from '../styles/theme';
import RecruitIcon from '../img/icon_recruit.svg';
import InlineButton from './InlineButton';

const EditProfileCard = ({ card, navigation, route }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={(card.name == 'Maggie Farrell') ? require('../assets/IMG_9476.jpg') : require('../assets/austin-wade-X6Uj51n5CE8-unsplash-min.jpg')}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <View style={styles.hobbiesContainer}>
        {card.hobbies.map((hobby, key) => (
          <HobbyTag hobby={hobby} id={key} />
        ))}
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
            <Text style={styles.name}>
              {`${card.name}`}
            </Text>
            <View style={{alignSelf: 'baseline', top: 29-15-1.5}}>
            <InlineButton text="&nbsp;Edit" style={{fontSize: 15,}} onPress={() => navigation.navigate('EditProfile')}/>
            </View>
          </View>
          <Text style={styles.bio}>
            {`${card.bio}`}
          </Text>
        </View>
        <View
          style={[styles.recruitButtonContainer,{opacity:.618*.85}]}>
          <View style={styles.recruitButton}>
            <RecruitIcon width={55} height={55} gradStart={colors.iceBlue} gradEnd={colors.orchid}/>
          </View>
          <InlineButton text='Recruit' style={{fontStyle: 'italic', fontSize: 15}}/>
        </View>
      </View>
      {/* <Text style={styles.text}>
        {`${card.name}`}
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.edit}>&nbsp;&nbsp;&nbsp;Edit</Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.bio}>
        {`${card.bio}`}
      </Text> */}
    </View>
  </View>
)

EditProfileCard.propTypes = { 
  card: shape({
    name: string,
    age: number,
    bio: string
  }).isRequired,
}
export default EditProfileCard;