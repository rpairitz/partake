import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import colors from '../styles/theme';

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
    labelSpan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        marginLeft: 13,
        marginRight: 13,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    labelText: {
        color: colors.blue,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
        paddingLeft: 5,
        paddingRight: 5,
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
                        <Card key={post.postID}>
                            <Text style={styles.labelText}>{route.params.name}</Text>
                            <Text style={{ fontSize: 11, paddingLeft: 6}}>May 02, 2022{'\n'}</Text>
                            <Text style={{ fontSize: 13, paddingLeft: 6}}>{post.content}</Text>
                        </Card>
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