import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from "../img/icon_back.svg";
import ActionsMenu from './ActionsMenu';
import colors from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 13,
    flex: 1,
    zIndex: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 13
  }
});

const Chat = ({ navigation, route }) => {

  const photos = [
    require('../assets/don-delfin-espino-nBywXevf_jE-unsplash-min-3.jpg'),
    require('../assets/aleksander-borzenets-ozda-XbeP0k-unsplash-min.jpg'),
    require('../assets/austin-wade-ex6qfO4TPMY-unsplash-min.jpg'),
    require('../assets/austin-wade-X6Uj51n5CE8-unsplash-min.jpg'),
    require('../assets/caique-silva-3ujVzg9i2EI-unsplash-min.jpg'),
    require('../assets/caique-silva-S409PylpOiQ-unsplash-min.jpg'),
    require('../assets/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash-min.jpg'),
    require('../assets/eduardo-dutra-ZHy0efLnzVc-unsplash-min.jpg'),
    require('../assets/gift-habeshaw-dlbiYGwEe9U-unsplash-min.jpg'),
    require('../assets/guilherme-stecanella-_dH-oQF9w-Y-unsplash-min.jpg'),
    require('../assets/henri-pham-Ml4tr2WO7JE-unsplash-min.jpg'),
    require('../assets/jonathan-borba-n1B6ftPB5Eg-unsplash-min.jpg'),
    require('../assets/linkedin-sales-solutions-EI50ZDA-l8Y-unsplash-min.jpg'),
    require('../assets/nico-marks-mFcc5b_t74Q-unsplash-min.jpg'),
    require('../assets/sirio-Ty4f_NOFO60-unsplash-min.jpg'),
    require('../assets/stephanie-cook-NDCy2-9JhUs-unsplash-min.jpg'),
    require('../assets/teymi-townsend-AvLHH8qYbAI-unsplash-min.jpg'),
    require('../assets/tyler-nix-ZGa9d1a_4tA-unsplash-min.jpg'),
    require('../assets/venrick-azcueta-Sl15cCSOtYQ-unsplash-min.jpg'),
    require('../assets/wesley-tingey-TvPCUHten1o-unsplash-min.jpg')
  ];

  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showActions, setShowActions] = useState(false); // for actions within chat

  const loadMessages = () => {
    var axios = require('axios');
    let formData = new FormData();

    formData.append('username', route.params.username);
    formData.append('convoID', route.params.convoID);

    axios.post('http://23.22.183.138:8806/messages.php', formData)
      .then(res => {
        const allMessages = res.data.split("\n");
        allMessages.pop();
        var mess = [];
        for (let i = 0; i < allMessages.length; i++) {
          let tempMess = allMessages[i].split("|");
          let tempMessageObj = {};
          tempMessageObj._id = tempMess[0];
          tempMessageObj.text = tempMess[3];
          let tempCreate = new Date(Number(tempMess[6]));
          tempMessageObj.createdAt = tempCreate;
          tempMessageObj.user = {
            _id: Number(tempMess[2]),
            avatar: photos[route.params.pic]
          };
          mess.push(tempMessageObj);
        }
        setMessages(mess);
        setIsLoaded(true);
      }).catch(err => console.log(err));
  };

  const addMessage = (message) => {
    var axios = require('axios');
    let sentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-').toUpperCase();
    let sentTime = new Date().toLocaleTimeString().split(" ")[0];
    let createdAt = Date.now();

    let formData = new FormData();

    formData.append('messageID', message[0]._id);
    formData.append('convoID', route.params.convoID);
    formData.append('senderID', message[0].user._id);
    formData.append('content', message[0].text);
    formData.append('sentDate', sentDate);
    formData.append('sentTime', sentTime);
    formData.append('createdAt', createdAt);

    axios.post('http://23.22.183.138:8806/addMessage.php', formData)
      .then(res => {

      }).catch(err => console.log(err));
  };

  useEffect(() => {
    console.log('username: ', route.params.username);
    console.log('id: ', route.params.userID);
    console.log('convoID: ', route.params.convoID);
    const interval = setInterval(() => {
      loadMessages();
    }, 1000);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    // also push new messages to DB
    addMessage(messages);
  }, []);

  const onActionsPress = () => {
      setShowActions(!showActions);
  }

  if (!isLoaded) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.lavender} />
      </View>
    );
  }
  else {
    return (
      <>
        <SafeAreaView style={{ height: 89, zIndex: 99999, borderBottomColor: colors.grayInactive, borderBottomWidth: 0.38}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={{marginRight: 5,}}>
            <BackIcon width={34} height={34} />
          </TouchableOpacity>
          <Text style={{flex:1,textAlign: 'left',fontFamily: 'Arial',fontWeight:'bold',fontSize: 18,color: colors.grayActive,maxWidth: 310,}}>
            {route.params.participants}
          </Text>
          <ActionsMenu showActions={showActions} onActionsPress={onActionsPress} />
          </View>
        </SafeAreaView>
        <GiftedChat
          style={styles.container}
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          alignTop={true}
          user={{
            _id: route.params.userID,
            name: 'Me',
            createdAt: new Date(),
            avatar: require('../assets/chatpic.jpeg')
          }}
        />
      </>
    );
  }
}

export default Chat;