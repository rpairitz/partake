import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { shape, string, number } from 'prop-types'
import styles from '../styles/Card.styles'

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
      <View style={{flexDirection: 'row', flexWrap:"wrap"}}>
        {card.hobbies.map((hobby) => (
          <TouchableOpacity style={[styles.tag, {backgroundColor: '#9fa4d0'}]}>
            <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 12}}>&nbsp;{hobby}</Text>
          </TouchableOpacity>
        ))}
        <Text style={{marginBottom: 15}}>{'\n'}</Text>
      </View>
      <Text style={styles.text}>
        {`${card.name}`}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <Text style={styles.edit}>&nbsp;&nbsp;&nbsp;Chat (TEST)</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.edit}>&nbsp;&nbsp;&nbsp;Edit</Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.bio}>
        {`${card.bio}`}
      </Text>
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