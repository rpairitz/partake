import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
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
      <View style={{flexDirection: 'row', flexWrap:"wrap"}}>
        {card.hobbies.map((hobby) => (
          <TouchableOpacity style={[styles.tag, {backgroundColor: '#9fa4d0'}]}>
            <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 12}}>&nbsp;{hobby}</Text>
          </TouchableOpacity>
        ))}
        <Text style={{marginBottom: 15}}>{'\n'}</Text>
      </View>
      <Text style={styles.text}>
        {`${card.name ? card.name : "Out of Profiles"}`}
      </Text>
      <Text style={styles.bio}>
        {`${card.bio ? card.bio : "We'll have more soon!"}`}
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