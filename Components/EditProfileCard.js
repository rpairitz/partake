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
      source={card.photo}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.name}, ${card.age}`}
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