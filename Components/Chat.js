import React, { useState, useCallback, useEffect } from 'react'
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    container: {
      paddingTop: 10
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
});

const Chat = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState();

    const getID = () => {
      var axios = require('axios');
      let formData = new FormData();

      formData.append('username', route.params.username);
      axios.post('http://23.22.183.138:8806/getID.php', formData)
      .then((res) => {
        setUser(res.data);
      })
      .catch(err=>console.log(err));
    };

    const loadMessages = () => {
      var axios = require('axios');
      let formData = new FormData();

      formData.append('username', route.params.username);
      formData.append('convoID', route.params.convoID);

      axios.post('http://23.22.183.138:8806/messages.php', formData)
          .then(res=>{
              const allMessages = res.data.split("\n");
              allMessages.pop();
              var mess = [];
              for(let i = 0; i < allMessages.length; i++) {
                let tempMess = allMessages[i].split("|");
                let tempMessageObj = {};
                tempMessageObj._id = tempMess[0];
                tempMessageObj.text = tempMess[3];
                let tempCreate = new Date(Number(tempMess[6]));
                tempMessageObj.createdAt = tempCreate;
                tempMessageObj.user = {
                  _id: tempMess[2],
                  avatar: 'https://placeimg.com/140/140/any'
                };
                mess.push(tempMessageObj);
                setUser(tempMess[2]);
              }
              setMessages(mess);
          }).catch(err=>console.log(err));
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
            .then(res=>{
                
            }).catch(err=>console.log(err));
    };

    useEffect(() => {
      getID();
      const interval = setInterval(() => {
        loadMessages();
        setIsLoaded(true);
      }, 1000);
    }, []); // remove this? move it to separate use effect that does nothing really?

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // also push new messages to DB
        addMessage(messages);
    }, []);

    if(!isLoaded && !user) {
      return(
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#75d2ff" />
        </View>
      );
    }
    else if(!isLoaded || !user) {
      return(
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#75d2ff" />
        </View>
      );
    }
    else {
      return(
        <GiftedChat
            style={styles.container}
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            alignTop={true}
            user={{
                _id: user,
                name: 'Me',
                createdAt: new Date(),
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />
      );
    }
}

export default Chat;