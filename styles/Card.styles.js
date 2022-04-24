import { StyleSheet, Dimensions } from 'react-native'
import colors from './colors'
const { height } = Dimensions.get('window')
export default StyleSheet.create({
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    color: colors.white,
    fontFamily: 'Avenir',
    textShadowColor: colors.black,
    textShadowRadius: 10,
  },
  bio: {
    fontSize: 15,
    color: colors.white,
    fontFamily: 'Avenir',
    textShadowColor: colors.black,
    textShadowRadius: 10,
  },
  edit: {
    fontSize: 14,
    color: "#75d2ff",
    fontFamily: 'Avenir',
    textShadowColor: colors.black,
    textShadowRadius: 10,

  }
})