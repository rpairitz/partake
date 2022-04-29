import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const Chat = ({ navigation, route }) => {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();

    const loadMessages = () => {
      var axios = require('axios');
      let formData = new FormData();

      var username = 'imoore1098@example.com';
      formData.append('username', username);
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
                tempMessageObj.user = {
                  _id: tempMess[2],
                  avatar: 'https://placeimg.com/140/140/any'
                };
                setUser(tempMess[2]);
                console.log(tempMess[2]);
                mess.push(tempMessageObj);
              }
              setMessages(mess);
          }).catch(err=>console.log(err));
    };

    const addMessage = (message) => {
      var axios = require('axios');
      let formData = new FormData();

      formData.append('messageID', message[0]._id);
      formData.append('convoID', route.params.convoID);
      formData.append('senderID', message[0].user._id);
      formData.append('content', message[0].text);
      formData.append('sentTime', '29-APR-22');

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
        loadMessages();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // also push new messages to DB
        addMessage(messages);
    }, []);

    return(
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            alignTop="true"
            inverted="false"
            user={{
                _id: 1,
                name: 'Me',
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />
    );

}

export default Chat;