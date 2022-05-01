import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    container: {
      paddingTop: 10
    },
});

const Chat = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();

    const loadMessages = () => {
      var axios = require('axios');
      let formData = new FormData();

      formData.append('username', route.params.username);
      formData.append('convoID', route.params.convoID);

      axios.post('http://23.22.183.138:8806/messages.php', formData)
          .then(res=>{
              console.log(res.data);
              const allMessages = res.data.split("\n");
              allMessages.pop();
              var mess = [];
              for(let i = 0; i < allMessages.length; i++) {
                let tempMess = allMessages[i].split("|");
                let tempMessageObj = {};
                tempMessageObj._id = tempMess[0];
                tempMessageObj.text = tempMess[3];
                tempMessageObj.createdAt = tempMess[6];
                tempMessageObj.user = {
                  _id: tempMess[2],
                  avatar: 'https://placeimg.com/140/140/any'
                };
                setUser(tempMess[2]);
                mess.push(tempMessageObj);
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
      let createdAt = new Date();
      console.log(String(createdAt));

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
                console.log(res.data);
            }).catch(err=>console.log(err));
    };

    const renderBubble = () => {
      return(
        <Bubble 
          wrapperStyle={{
            right: {
              backgroundColor: '#75d2ff'
            },
            left: {
              backgroundColor: '#75d2ff'
            }
          }}
          textStyle={{
            left: {
              color: 'black'
            },
            right: {
              color: 'white'
            }
          }}
        />
      );
    };

    useEffect(() => {
      //const interval = setInterval(() => {
        loadMessages();
      //}, 1000);
      //loadMessages();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // also push new messages to DB
        addMessage(messages);
    }, []);

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
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />
    );

}

export default Chat;