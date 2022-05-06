import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/theme';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        fontSize: 20, 
        color: colors.blue,
        fontFamily: 'Arial', 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        paddingTop: 55,
        paddingBottom: 10
    },
    labelText: {
        color: colors.blue,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
        paddingLeft: 10,
    },
    loginText: {
        color: '#FFFFFF',
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    loginBtn: {
        width: 300,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        fontFamily: 'Arial',
        fontSize: 18,
        paddingLeft: 15,
        color: colors.blue,
        fontWeight: 'bold'
    },
});

const AddHobby = ({ navigation, route }) => {

    const hobbies = [];
    const [username, setUsername] = useState('');

    // Sports
    const [isAirsoftSelected, setIsAirsoftSelected] = useState(false);
    const [isArchSelected, setIsArchSelected] = useState(false);
    const [isBackSelected, setIsBackSelected] = useState(false);
    const [isBadminSelected, setIsBadminSelected] = useState(false);
    const [isBaseballSelected, setIsBaseballSelected] = useState(false);
    const [isBasketSelected, setIsBasketSelected] = useState(false);
    const [isBMXSelected, setIsBMXSelected] = useState(false);
    const [isBodySelected, setIsBodySelected] = useState(false);
    const [isClimbSelected, setIsClimbSelected] = useState(false);
    const [isCroquetSelected, setIsCroquetSelected] = useState(false);
    const [isCycleSelected, setIsCycleSelected] = useState(false);
    const [isDartsSelected, setIsDartsSelected] = useState(false);
    const [isDriveSelected, setIsDriveSelected] = useState(false);
    const [isFishSelected, setIsFishSelected] = useState(false);
    const [isFlagSelected, setIsFlagSelected] = useState(false);
    const [isFootSelected, setIsFootSelected] = useState(false);
    const [isGymSelected, setIsGymSelected] = useState(false);
    const [isHandSelected, setIsHandSelected] = useState(false);
    const [isHikeSelected, setIsHikeSelected] = useState(false);
    const [isHorseSelected, setIsHorseSelected] = useState(false);
    const [isJumpSelected, setIsJumpSelected] = useState(false);
    const [isKayakSelected, setIsKayakSelected] = useState(false);
    const [isLacSelected, setIsLacSelected] = useState(false);
    const [isLongSelected, setIsLongSelected] = useState(false);
    const [isMartSelected, setIsMartSelected] = useState(false);
    const [isMountSelected, setIsMountSelected] = useState(false);
    const [isNetSelected, setIsNetSelected] = useState(false);
    const [isPaintSelected, setIsPaintSelected] = useState(false);
    const [isParaSelected, setIsParaSelected] = useState(false);
    const [isPickSelected, setIsPickSelected] = useState(false);
    const [isPowerSelected, setIsPowerSelected] = useState(false);
    const [isRaftSelected, setIsRaftSelected] = useState(false);
    const [isRockSelected, setIsRockSelected] = useState(false);
    const [isRollSelected, setIsRollSelected] = useState(false);
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [isRugSelected, setIsRugSelected] = useState(false);
    const [isRunSelected, setIsRunSelected] = useState(false);
    const [isSailSelected, setIsSailSelected] = useState(false);
    const [isScubaSelected, setIsScubaSelected] = useState(false);
    const [isShootSelected, setIsShootSelected] = useState(false);
    const [isSkateSelected, setIsSkateSelected] = useState(false);
    const [isSkiSelected, setIsSkiSelected] = useState(false);
    const [isSkySelected, setIsSkySelected] = useState(false);
    const [isSnowbSelected, setIsSnowbSelected] = useState(false);
    const [isSocSelected, setIsSocSelected] = useState(false);
    const [isSurfSelected, setIsSurfSelected] = useState(false);
    const [isSwimSelected, setIsSwimSelected] = useState(false);
    const [isTabSelected, setIsTabSelected] = useState(false);
    const [isTenSelected, setIsTenSelected] = useState(false);
    const [isVollSelected, setIsVollSelected] = useState(false);
    const [isWatSelected, setIsWatSelected] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials').
        then((gotItem) => {
            console.log(gotItem);
            setUsername(JSON.parse(gotItem));
        })
        .catch((error) => console.log(error))
    }, [username]);

    // Lifestyle
    const [isAnimeSelected, setIsAnimeSelected] = useState(false);
    const [isAstroSelected, setIsAstroSelected] = useState(false);
    const [isBakeSelected, setIsBakeSelected] = useState(false);
    const [isBeerSelected, setIsBeerSelected] = useState(false);
    const [isBookSelected, setIsBookSelected] = useState(false);
    const [isCarsSelected, setIsCarsSelected] = useState(false);
    const [isCofSelected, setIsCofSelected] = useState(false);
    const [isCookSelected, setIsCookSelected] = useState(false);
    const [isGarSelected, setIsGarSelected] = useState(false);
    const [isHomeSelected, setIsHomeSelected] = useState(false);
    const [isJugSelected, setIsJugSelected] = useState(false);
    const [isKarSelected, setIsKarSelected] = useState(false);
    const [isMagSelected, setIsMagSelected] = useState(false);
    const [isWriteSelected, setIsWriteSelected] = useState(false);

    // Arts & Crafts
    const [isActSelected, setIsActSelected] = useState(false);
    const [isAnimSelected, setIsAnimSelected] = useState(false);
    const [isCalliSelected, setIsCalliSelected] = useState(false);
    const [isCroSelected, setIsCroSelected] = useState(false);
    const [isDanSelected, setIsDanSelected] = useState(false);
    const [isDJSelected, setIsDJSelected] = useState(false);
    const [isFashSelected, setIsFashSelected] = useState(false);
    const [isFilmSelected, setIsFilmSelected] = useState(false);
    const [isPaiSelected, setIsPaiSelected] = useState(false);
    const [isPottSelected, setIsPottSelected] = useState(false);
    const [isSewSelected, setIsSewSelected] = useState(false);

    // Collecting
    const [isFigSelected, setIsFigSelected] = useState(false);
    const [isComSelected, setIsComSelected] = useState(false);
    const [isRecSelected, setIsRecSelected] = useState(false);
    const [isShoeSelected, setIsShoeSelected] = useState(false);
    const [isStaSelected, setIsStaSelected] = useState(false);
    const [isCarSelected, setIsCarSelected] = useState(false);

    // Games
    const [isBillSelected, setIsBillSelected] = useState(false);
    const [isBridgeSelected, setIsBridgeSelected] = useState(false);
    const [isMahSelected, setIsMahSelected] = useState(false);
    const [isPokeSelected, setIsPokeSelected] = useState(false);
    const [isVideoSelected, setIsVideoSelected] = useState(false);

    const saveHobbies = () => {
        // Hobbies
        if(isAirsoftSelected) {
            hobbies.push('Airsoft');
        }
        if(isArchSelected) {
            hobbies.push('Archery');
        }
        if(isBackSelected) {
            hobbies.push('Backpacking');
        }
        if(isBadminSelected) {
            hobbies.push('Badminton');
        }
        if(isBaseballSelected) {
            hobbies.push('Baseball');
        }
        if(isBasketSelected) {
            hobbies.push('Basketball');
        }
        if(isBMXSelected) {
            hobbies.push('BMX');
        }
        if(isBodySelected) {
            hobbies.push('Bodybuilding');
        }
        if(isClimbSelected) {
            hobbies.push('Climbing');
        }
        if(isCroquetSelected) {
            hobbies.push('Croquet');
        }
        if(isCycleSelected) {
            hobbies.push('Cycling');
        }
        if(isDartsSelected) {
            hobbies.push('Darts');
        }
        if(isDriveSelected) {
            hobbies.push('Driving');
        }
        if(isFishSelected) {
            hobbies.push('Fishing');
        }
        if(isFlagSelected) {
            hobbies.push('Flag Football');
        }
        if(isFootSelected) {
            hobbies.push('Football');
        }
        if(isGymSelected) {
            hobbies.push('Gymnastics');
        }
        if(isHandSelected) {
            hobbies.push('Handball');
        }
        if(isHikeSelected) {
            hobbies.push('Hiking');
        }
        if(isHorseSelected) {
            hobbies.push('Horseback Riding');
        }
        if(isJumpSelected) {
            hobbies.push('Jump Rope');
        }
        if(isKayakSelected) {
            hobbies.push('Kayaking');
        }
        if(isLacSelected) {
            hobbies.push('Lacrosse');
        }
        if(isLongSelected) {
            hobbies.push('Longboarding');
        }
        if(isMartSelected) {
            hobbies.push('Martial Arts');
        }
        if(isMountSelected) {
            hobbies.push('Mountain Biking');
        }
        if(isNetSelected) {
            hobbies.push('Netball');
        }
        if(isPaintSelected) {
            hobbies.push('Paintball');
        }
        if(isParaSelected) {
            hobbies.push('Paragliding');
        }
        if(isPickSelected) {
            hobbies.push('Pickleball');
        }
        if(isPowerSelected) {
            hobbies.push('Powerlifting');
        }
        if(isRaftSelected) {
            hobbies.push('Rafting');
        }
        if(isRockSelected) {
            hobbies.push('Rock Climbing');
        }
        if(isRollSelected) {
            hobbies.push('Roller Skating');
        }
        if(isRowSelected) {
            hobbies.push('Rowing');
        }
        if(isRugSelected) {
            hobbies.push('Rugby');
        }
        if(isRunSelected) {
            hobbies.push('Running');
        }
        if(isSailSelected) {
            hobbies.push('Sailing');
        }
        if(isScubaSelected) {
            hobbies.push('Scuba Diving');
        }
        if(isShootSelected) {
            hobbies.push('Shooting');
        }
        if(isSkateSelected) {
            hobbies.push('Skateboarding');
        }
        if(isSkiSelected) {
            hobbies.push('Skiing');
        }
        if(isSkySelected) {
            hobbies.push('Skydiving');
        }
        if(isSnowbSelected) {
            hobbies.push('Snowboarding');
        }
        if(isSocSelected) {
            hobbies.push('Soccer');
        }
        if(isSurfSelected) {
            hobbies.push('Surfing');
        }
        if(isSwimSelected) {
            hobbies.push('Swimming');
        }
        if(isTabSelected) {
            hobbies.push('Table Tennis');
        }
        if(isTenSelected) {
            hobbies.push('Tennis');
        }
        if(isVollSelected) {
            hobbies.push('Volleyball');
        }
        if(isWatSelected) {
            hobbies.push('Water Polo');
        }
        // Lifestyle
        if(isAnimeSelected) {
            hobbies.push('Anime');
        }
        if(isAstroSelected) {
            hobbies.push('Astrology');
        }
        if(isBakeSelected) {
            hobbies.push('Baking');
        }
        if(isBeerSelected) {
            hobbies.push('Beer Tasting');
        }
        if(isBookSelected) {
            hobbies.push('Book Discussion');
        }
        if(isCarsSelected) {
            hobbies.push('Cars');
        }
        if(isCofSelected) {
            hobbies.push('Coffee');
        }
        if(isCookSelected) {
            hobbies.push('Cooking');
        }
        if(isGarSelected) {
            hobbies.push('Gardening');
        }
        if(isHomeSelected) {
            hobbies.push('Home Improvement');
        }
        if(isJugSelected) {
            hobbies.push('Juggling');
        }
        if(isKarSelected) {
            hobbies.push('Karaoke');
        }
        if(isMagSelected) {
            hobbies.push('Magic');
        }
        if(isWriteSelected) {
            hobbies.push('Writing');
        }

        // Arts and crafts
        if(isActSelected) {
            hobbies.push('Acting');
        }
        if(isAnimSelected) {
            hobbies.push('Animation');
        }
        if(isCalliSelected) {
            hobbies.push('Calligraphy');
        }
        if(isCroSelected) {
            hobbies.push('Crocheting');
        }
        if(isDanSelected) {
            hobbies.push('Dance');
        }
        if(isDJSelected) {
            hobbies.push('DJing');
        }
        if(isFashSelected) {
            hobbies.push('Fashion');
        }
        if(isFilmSelected) {
            hobbies.push('Filmmaking');
        }
        if(isPaiSelected) {
            hobbies.push('Painting');
        }
        if(isPottSelected) {
            hobbies.push('Pottery');
        }
        if(isSewSelected) {
            hobbies.push('Sewing');
        }

        // Collecting
        if(isFigSelected) {
            hobbies.push('Action Figures');
        }
        if(isComSelected) {
            hobbies.push('Comic Book');
        }
        if(isRecSelected) {
            hobbies.push('Record');
        }
        if(isShoeSelected) {
            hobbies.push('Show');
        }
        if(isStaSelected) {
            hobbies.push('Stamp');
        }
        if(isCarSelected) {
            hobbies.push('Car');
        }

        // Games
        if(isBillSelected) {
            hobbies.push('Billiards');
        }
        if(isBridgeSelected) {
            hobbies.push('Bridge');
        }
        if(isMahSelected) {
            hobbies.push('Mahjong');
        }
        if(isPokeSelected) {
            hobbies.push('Poker');
        }
        if(isVideoSelected) {
            hobbies.push('Video Games');
        }

        if(hobbies.length == 0){
            alert("Please select at least one hobby!");
        } else{
            var axios = require('axios');
            let formData = new FormData();

            formData.append('username', username);
            for(let i = 0; i < hobbies.length; i++) {
                formData.append('hobbies[]', hobbies[i]);
            }

            axios.post('http://23.22.183.138:8806/addHobby.php', formData)
                .then(res=>{
                    AsyncStorage.setItem('hobbyFlag', JSON.stringify(true));
                    console.log(res.data);
                    
                }).catch(err=>console.log(err));
        }
    };

    return(
        <View style={styles.container}>
        <Header text={'Select Hobbies'} displayBack={true} onPressBack={() => navigation.goBack()} />
            <ScrollView>
                <Text style={styles.labelText}>Sports</Text>
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Airsoft &#128299;" checked={isAirsoftSelected} onPress={() => setIsAirsoftSelected(!isAirsoftSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Archery &#127993;" checked={isArchSelected} onPress={() => setIsArchSelected(!isArchSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Backpacking &#127890;" checked={isBackSelected} onPress={() => setIsBackSelected(!isBackSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Badminton &#127992;" checked={isBadminSelected} onPress={() => setIsBadminSelected(!isBadminSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Baseball &#9918;" checked={isBaseballSelected} onPress={() => setIsBaseballSelected(!isBaseballSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Basketball &#127936;" checked={isBasketSelected} onPress={() => setIsBasketSelected(!isBasketSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="BMX &#128690;" checked={isBMXSelected} onPress={() => setIsBMXSelected(!isBMXSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Bodybuilding &#127947;" checked={isBodySelected} onPress={() => setIsBodySelected(!isBodySelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Climbing &#129495;" checked={isClimbSelected} onPress={() => setIsClimbSelected(!isClimbSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Croquet &#127951;" checked={isCroquetSelected} onPress={() => setIsCroquetSelected(!isCroquetSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Cycling &#128692;" checked={isCycleSelected} onPress={() => setIsCycleSelected(!isCycleSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Darts &#127919;" checked={isDartsSelected} onPress={() => setIsDartsSelected(!isDartsSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Driving &#128663;" checked={isDriveSelected} onPress={() => setIsDriveSelected(!isDriveSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Fishing &#127907;" checked={isFishSelected} onPress={() => setIsFishSelected(!isFishSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Flag Football &#128681;" checked={isFlagSelected} onPress={() => setIsFlagSelected(!isFlagSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Football &#127944;" checked={isFootSelected} onPress={() => setIsFootSelected(!isFootSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Gymnastics &#129336;" checked={isGymSelected} onPress={() => setIsGymSelected(!isGymSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Handball &#129342;" checked={isHandSelected} onPress={() => setIsHandSelected(!isHandSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Hiking &#127957;" checked={isHikeSelected} onPress={() => setIsHikeSelected(!isHikeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Horseback Riding &#128014;" checked={isHorseSelected} onPress={() => setIsHorseSelected(!isHorseSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Jump Rope &#128255;" checked={isJumpSelected} onPress={() => setIsJumpSelected(!isJumpSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Kayaking &#128758;" checked={isKayakSelected} onPress={() => setIsKayakSelected(!isKayakSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Lacrosse &#129357;" checked={isLacSelected} onPress={() => setIsLacSelected(!isLacSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Longboarding &#128761;" checked={isLongSelected} onPress={() => setIsLongSelected(!isLongSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Martial Arts &#129355;" checked={isMartSelected} onPress={() => setIsMartSelected(!isMartSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Mountain Biking &#128693;" checked={isMountSelected} onPress={() => setIsMountSelected(!isMountSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Netball &#129349;" checked={isNetSelected} onPress={() => setIsNetSelected(!isNetSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Paintball &#128299;" checked={isPaintSelected} onPress={() => setIsPaintSelected(!isPaintSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Paragliding &#128168;" checked={isParaSelected} onPress={() => setIsParaSelected(!isParaSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Pickleball &#129358;" checked={isPickSelected} onPress={() => setIsPickSelected(!isPickSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Powerlifting &#127947;" checked={isPowerSelected} onPress={() => setIsPowerSelected(!isPowerSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Rafting &#128675;" checked={isRaftSelected} onPress={() => setIsRaftSelected(!isRaftSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Rock Climbing &#129495;" checked={isRockSelected} onPress={() => setIsRockSelected(!isRockSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Roller Skating &#128095;" checked={isRollSelected} onPress={() => setIsRollSelected(!isRollSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Rowing &#128675;" checked={isRowSelected} onPress={() => setIsRowSelected(!isRowSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Rugby &#127945;" checked={isRugSelected} onPress={() => setIsRugSelected(!isRugSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Running &#127939;" checked={isRunSelected} onPress={() => setIsRunSelected(!isRunSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Sailing &#9973;" checked={isSailSelected} onPress={() => setIsSailSelected(!isSailSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Scuba Diving &#128032;" checked={isScubaSelected} onPress={() => setIsScubaSelected(!isScubaSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Shooting &#128299;" checked={isShootSelected} onPress={() => setIsShootSelected(!isShootSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Skateboarding &#128761;" checked={isSkateSelected} onPress={() => setIsSkateSelected(!isSkateSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Skiing &#9975;" checked={isSkiSelected} onPress={() => setIsSkiSelected(!isSkiSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Skydiving &#128747;" checked={isSkySelected} onPress={() => setIsSkySelected(!isSkySelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Snowboarding &#127938;" checked={isSnowbSelected} onPress={() => setIsSnowbSelected(!isSnowbSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Soccer &#9917;" checked={isSocSelected} onPress={() => setIsSocSelected(!isSocSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Surfing &#127940;" checked={isSurfSelected} onPress={() => setIsSurfSelected(!isSurfSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Swimming &#127946;" checked={isSwimSelected} onPress={() => setIsSwimSelected(!isSwimSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Table Tennis &#127955;" checked={isTabSelected} onPress={() => setIsTabSelected(!isTabSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Tennis &#127934;" checked={isTenSelected} onPress={() => setIsTenSelected(!isTenSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Volleyball &#127952;" checked={isVollSelected} onPress={() => setIsVollSelected(!isVollSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Water Polo &#129341;" checked={isWatSelected} onPress={() => setIsWatSelected(!isWatSelected)} />

                <Text style={styles.section}>Lifestyle</Text>
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Anime &#127983;" checked={isAnimeSelected} onPress={() => setIsAnimeSelected(!isAnimeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Astrology &#9804;" checked={isAstroSelected} onPress={() => setIsAstroSelected(!isAstroSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Baking &#127856;" checked={isBakeSelected} onPress={() => setIsBakeSelected(!isBakeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Beer Tasting &#127866;" checked={isBeerSelected} onPress={() => setIsBeerSelected(!isBeerSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Book Discussion &#128218;" checked={isBookSelected} onPress={() => setIsBookSelected(!isBookSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Cars &#128663;" checked={isCarsSelected} onPress={() => setIsCarsSelected(!isCarsSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Coffee &#9749;" checked={isCofSelected} onPress={() => setIsCofSelected(!isCofSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Cooking &#127859;" checked={isCookSelected} onPress={() => setIsCookSelected(!isCookSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Gardening &#127793;" checked={isGarSelected} onPress={() => setIsGarSelected(!isGarSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Home Improvement &#127969;" checked={isHomeSelected} onPress={() => setIsHomeSelected(!isHomeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Juggling &#129337;" checked={isJugSelected} onPress={() => setIsJugSelected(!isJugSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Karaoke &#127908;" checked={isKarSelected} onPress={() => setIsKarSelected(!isKarSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Magic &#10024;" checked={isMagSelected} onPress={() => setIsMagSelected(!isMagSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Writing &#128221;" checked={isWriteSelected} onPress={() => setIsWriteSelected(!isWriteSelected)} />

                <Text style={styles.section}>Arts & Crafts</Text>
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Acting &#127917;" checked={isActSelected} onPress={() => setIsActSelected(!isActSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Animation &#127916;" checked={isAnimSelected} onPress={() => setIsAnimSelected(!isAnimSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Calligraphy &#128395;" checked={isCalliSelected} onPress={() => setIsCalliSelected(!isCalliSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Crocheting &#128117;" checked={isCroSelected} onPress={() => setIsCroSelected(!isCroSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Dance &#128131;" checked={isDanSelected} onPress={() => setIsDanSelected(!isDanSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="DJing &#128191;" checked={isDJSelected} onPress={() => setIsDJSelected(!isDJSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Fashion &#128087;" checked={isFashSelected} onPress={() => setIsFashSelected(!isFashSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Filmmaking &#127909;" checked={isFilmSelected} onPress={() => setIsFilmSelected(!isFilmSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Painting &#127912;" checked={isPaiSelected} onPress={() => setIsPaiSelected(!isPaiSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Pottery &#127994;" checked={isPottSelected} onPress={() => setIsPottSelected(!isPottSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Sewing &#128117;" checked={isSewSelected} onPress={() => setIsSewSelected(!isSewSelected)} />

                <Text style={styles.section}>Collecting</Text>
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Action Figures &#127886;" checked={isFigSelected} onPress={() => setIsFigSelected(!isFigSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Car &#128663;" checked={isCarSelected} onPress={() => setIsCarSelected(!isCarSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Comic Book &#128215;" checked={isComSelected} onPress={() => setIsComSelected(!isComSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Record &#128191;" checked={isRecSelected} onPress={() => setIsRecSelected(!isRecSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Shoe &#128094;" checked={isShoeSelected} onPress={() => setIsShoeSelected(!isShoeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Stamp &#128174;" checked={isStaSelected} onPress={() => setIsStaSelected(!isStaSelected)} />

                <Text style={styles.section}>Games</Text>
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Billiards &#127921;" checked={isBillSelected} onPress={() => setIsBillSelected(!isBillSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Bridge &#127183;" checked={isBridgeSelected} onPress={() => setIsBridgeSelected(!isBridgeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Mahjong &#126980;" checked={isMahSelected} onPress={() => setIsMahSelected(!isMahSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Poker &#127183;" checked={isPokeSelected} onPress={() => setIsPokeSelected(!isPokeSelected)} />
                <CheckBox fontFamily='Arial' checkedColor='#75d2ff' title="Video Games &#127918;" checked={isVideoSelected} onPress={() => setIsVideoSelected(!isVideoSelected)} />
            </ScrollView>
            
            <SafeAreaView style={{
                position: 'absolute', bottom: 0, alignSelf: 'center', width: windowWidth,
                backgroundColor: colors.white,
                paddingTop: 13, borderTopColor: colors.grayInactive, borderTopWidth: 0.62,
            }}
                edges={['bottom']}>
                <Button onPress={() => {saveHobbies(); navigation.navigate('Home')}} text={'Save selected'} width={(windowWidth / 1.618)} />
            </SafeAreaView>
        </View>
    );
};

export default AddHobby;