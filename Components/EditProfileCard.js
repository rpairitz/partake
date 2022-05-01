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
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.tag}>
          <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 12}}>&nbsp;Soccer</Text>
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <TouchableOpacity style={[styles.tag, {backgroundColor: '#9fa4d0'}]}>
          <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 12}}>&nbsp;Painting</Text>
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <TouchableOpacity style={[styles.tag, {backgroundColor: '#d7b1cd'}]}>
          <Text style={{color: 'white', fontFamily: 'Avenir', fontSize: 12}}>&nbsp;Poetry</Text>
        </TouchableOpacity>
        <Text style={{marginBottom: 15}}>{'\n'}</Text>
      </View>
      <Text style={styles.text}>
        {`${card.name}`}
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