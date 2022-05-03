import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});

const HobbyPosts = ({ navigation, route }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    const loadPosts = () => {
        var axios = require('axios');
        let formData = new FormData();
        var allPosts = [];

        formData.append('hobbyID', route.params.hobbyID);
        axios.post('http://23.22.183.138:8806/getPosts.php', formData)
        .then((res) => {
            const posts = res.data.split("\n");
            posts.pop();
            for(let i = 0; i < posts.length; i++) {
                let tempPost = {};
                let postParts = posts[i].split("~");
                let postID = postParts[0];
                let senderID = postParts[1];
                let content = postParts[2];
                let createdAt = postParts[3];
                tempPost.postID = postID;
                tempPost.senderID = senderID;
                tempPost.content = content;
                tempPost.createdAt = createdAt;
                allPosts.push(tempPost);
            }
            console.log(allPosts);
            setPosts(allPosts);
            setIsLoaded(true);
        })
        .catch(err=>console.log(err));
    };

    useEffect(() => {
        console.log('hobbyID: ', route.params.hobbyID);
        loadPosts();
    }, []);

    if(!isLoaded) {
        return(
            <View style={[styles.loadingContainer, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    else {
        if(posts.length) {
            return posts.map((post) => {
                return(
                    <View>
                        <Text>{post.postID}</Text>
                        <Text>{post.content}</Text>
                        <Text>{post.createdAt} {/* Turn this into a date for displaying in the post card*/}</Text>
                    </View>
                );
            });
        }
        else {
            return(
                <View>
                    <Text>No posts yet for this hobby.</Text>
                </View>
            );
        }
    }
    
};

export default HobbyPosts;