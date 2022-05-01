import React from 'react'
import { View, Text, Image } from 'react-native'
import { shape, string } from 'prop-types'
import styles from '../styles/Card.styles'

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
      <Text style={styles.text}>
        {`${card.name}`}
      </Text>
      <Text style={styles.bio}>
        {`${card.bio}`}
      </Text>
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