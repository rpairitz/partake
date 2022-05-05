import { StyleSheet, Dimensions } from 'react-native'
import colors from './theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  card: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
  },
  image: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    height: (windowHeight/1.618) + (windowHeight/(2.618*2.618)),
    width: windowWidth-16,
    // flexDirection: 'column',
    // top: -55,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 21,
    position: 'relative',
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowRadius: 6,
    // shadowOpacity: 0.3,
    // elevation: 2,
  },
  hobbiesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start',
  },
  photoDescriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    height: '100%',
    width: windowWidth-32,
    position: 'absolute',
    maxWidth: windowWidth-16,
    maxHeight: 350,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 18,
    top: (windowHeight/1.618) + (windowHeight/(2.618*2.618)) - 350,
  },
  infoWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    height: 102
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  name: {
    fontSize: 29,
    color: colors.white,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    paddingBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.618)',
    textShadowRadius: 5,
  },
  bio: {
    fontSize: 18,
    color: colors.white,
    fontFamily: 'Arial',
    maxWidth: 254,
    textShadowColor: 'rgba(0,0,0,0.618)',
    textShadowRadius: 5,
  },
  recruitButtonContainer: {
    alignSelf: 'center', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    opacity: 1,
  },
  recruitButton: {
    backgroundColor: colors.white, 
    opacity: .85, 
    borderRadius: 55, 
    marginBottom: 5,
  },
  edit: {
    fontSize: 14,
    color: "#75d2ff",
    fontFamily: 'Arial',
    // textShadowColor: colors.black,
    // textShadowRadius: 10,
  },
  tag: {
    borderRadius: 14,
    width: 90,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#75d2ff',
    justifyContent: 'center'
  },
})