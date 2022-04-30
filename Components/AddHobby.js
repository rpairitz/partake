import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20, 
        color: "#75d2ff", 
        fontFamily: 'Avenir', 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        paddingTop: 55,
        paddingBottom: 10
    },
    loginText: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
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
        fontFamily: 'Avenir',
        fontSize: 18,
        paddingLeft: 15,
        color: '#75d2ff',
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
    const [isBaseSelected, setIsBaseSelected] = useState(false);
    const [isBaseballSelected, setIsBaseballSelected] = useState(false);
    const [isBasketSelected, setIsBasketSelected] = useState(false);
    const [isBMXSelected, setIsBMXSelected] = useState(false);
    const [isBodySelected, setIsBodySelected] = useState(false);
    const [isCanoeSelected, setIsCanoeSelected] = useState(false);
    const [isCanyonSelected, setIsCanyonSelected] = useState(false);
    const [isCaveSelected, setIsCaveSelected] = useState(false);
    const [isClimbSelected, setIsClimbSelected] = useState(false);
    const [isCroquetSelected, setIsCroquetSelected] = useState(false);
    const [isCycleSelected, setIsCycleSelected] = useState(false);
    const [isDartsSelected, setIsDartsSelected] = useState(false);
    const [isDriveSelected, setIsDriveSelected] = useState(false);
    const [isFishSelected, setIsFishSelected] = useState(false);
    const [isFlagSelected, setIsFlagSelected] = useState(false);
    const [isDiscSelected, setIsDiscSelected] = useState(false);
    const [isFootSelected, setIsFootSelected] = useState(false);
    const [isGymSelected, setIsGymSelected] = useState(false);
    const [isHandSelected, setIsHandSelected] = useState(false);
    const [isHikeSelected, setIsHikeSelected] = useState(false);
    const [isHorseSelected, setIsHorseSelected] = useState(false);
    const [isInlineSelected, setIsInlineSelected] = useState(false);
    const [isJogSelected, setIsJogSelected] = useState(false);
    const [isJumpSelected, setIsJumpSelected] = useState(false);
    const [isKartSelected, setIsKartSelected] = useState(false);
    const [isKayakSelected, setIsKayakSelected] = useState(false);
    const [isKiteSelected, setIsKiteSelected] = useState(false);
    const [isLacSelected, setIsLacSelected] = useState(false);
    const [isLongSelected, setIsLongSelected] = useState(false);
    const [isMartSelected, setIsMartSelected] = useState(false);
    const [isMotorSelected, setIsMotorSelected] = useState(false);
    const [isMountSelected, setIsMountSelected] = useState(false);
    const [isMount2Selected, setIsMount2Selected] = useState(false);
    const [isNetSelected, setIsNetSelected] = useState(false);
    const [isPaintSelected, setIsPaintSelected] = useState(false);
    const [isParaSelected, setIsParaSelected] = useState(false);
    const [isParkSelected, setIsParkSelected] = useState(false);
    const [isPickSelected, setIsPickSelected] = useState(false);
    const [isPoloSelected, setIsPoloSelected] = useState(false);
    const [isPowerSelected, setIsPowerSelected] = useState(false);
    const [isRaftSelected, setIsRaftSelected] = useState(false);
    const [isRapSelected, setIsRapSelected] = useState(false);
    const [isRoadSelected, setIsRoadSelected] = useState(false);
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
    const [isSlackSelected, setIsSlackSelected] = useState(false);
    const [isSnorkSelected, setIsSnorkSelected] = useState(false);
    const [isSnowbSelected, setIsSnowbSelected] = useState(false);
    const [isSnowmSelected, setIsSnowmSelected] = useState(false);
    const [isSnowSelected, setIsSnowSelected] = useState(false);
    const [isSocSelected, setIsSocSelected] = useState(false);
    const [isSurfSelected, setIsSurfSelected] = useState(false);
    const [isSwimSelected, setIsSwimSelected] = useState(false);
    const [isTabSelected, setIsTabSelected] = useState(false);
    const [isTaeSelected, setIsTaeSelected] = useState(false);
    const [isTaiSelected, setIsTaiSelected] = useState(false);
    const [isTenSelected, setIsTenSelected] = useState(false);
    const [isThruSelected, setIsThruSelected] = useState(false);
    const [isVollSelected, setIsVollSelected] = useState(false);
    const [isWatSelected, setIsWatSelected] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('partakeCredentials').
        then((gotItem) => {
            console.log(gotItem);
            setUsername(gotItem);
        })
        .catch((error) => console.log(error))
    }, [username]);

    // Lifestyle

    // Arts & Crafts

    // Collecting

    // Games

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
        if(isBaseSelected) {
            hobbies.push('BASE Jumping');
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
        if(isCanoeSelected) {
            hobbies.push('Canoeing');
        }
        if(isCanyonSelected) {
            hobbies.push('Canyoning');
        }
        if(isCaveSelected) {
            hobbies.push('Caving');
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
        if(isDiscSelected) {
            hobbies.push('Flying Disc');
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
        if(isInlineSelected) {
            hobbies.push('Inline Skating');
        }
        if(isJogSelected) {
            hobbies.push('Jogging');
        }
        if(isJumpSelected) {
            hobbies.push('Jump Rope');
        }
        if(isKartSelected) {
            hobbies.push('Karting');
        }
        if(isKayakSelected) {
            hobbies.push('Kayaking');
        }
        if(isKiteSelected) {
            hobbies.push('Kite Surfing');
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
        if(isMotorSelected) {
            hobbies.push('Motor Sports');
        }
        if(isMountSelected) {
            hobbies.push('Mountain Biking');
        }
        if(isMount2Selected) {
            hobbies.push('Mountaineering');
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
        if(isParkSelected) {
            hobbies.push('Parkour');
        }
        if(isPickSelected) {
            hobbies.push('Pickleball');
        }
        if(isPoloSelected) {
            hobbies.push('Polo');
        }
        if(isPowerSelected) {
            hobbies.push('Powerlifting');
        }
        if(isRaftSelected) {
            hobbies.push('Rafting');
        }
        if(isRapSelected) {
            hobbies.push('Rappelling');
        }
        if(isRoadSelected) {
            hobbies.push('Road Biking');
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
        if(isSlackSelected) {
            hobbies.push('Slacklining');
        }
        if(isSnorkSelected) {
            hobbies.push('Snorkeling');
        }
        if(isSnowbSelected) {
            hobbies.push('Snowboarding');
        }
        if(isSnowmSelected) {
            hobbies.push('Snowmobiling');
        }
        if(isSnowSelected) {
            hobbies.push('Snowshoeing');
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
        if(isTaeSelected) {
            hobbies.push('Taekwondo');
        }
        if(isTaiSelected) {
            hobbies.push('Tai Chi');
        }
        if(isTenSelected) {
            hobbies.push('Tennis');
        }
        if(isThruSelected) {
            hobbies.push('Thru-hiking');
        }
        if(isVollSelected) {
            hobbies.push('Volleyball');
        }
        if(isWatSelected) {
            hobbies.push('Water Polo');
        }

        var axios = require('axios');
        let formData = new FormData();

        formData.append('username', username);
        for(let i = 0; i < hobbies.length; i++) {
            formData.append('hobbies[]', hobbies[i]);
        }

        axios.post('http://23.22.183.138:8806/addHobby.php', formData)
            .then(res=>{
                console.log(res.data);
                
            }).catch(err=>console.log(err));
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Select Hobbies</Text>
            <ScrollView>
                <Text style={styles.section}>Sports</Text>
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Airsoft &#128299;" checked={isAirsoftSelected} onPress={() => setIsAirsoftSelected(!isAirsoftSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Archery &#127993;" checked={isArchSelected} onPress={() => setIsArchSelected(!isArchSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Backpacking &#127890;" checked={isBackSelected} onPress={() => setIsBackSelected(!isBackSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Badminton &#127992;" checked={isBadminSelected} onPress={() => setIsBadminSelected(!isBadminSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="BASE Jumping &#128747;" checked={isBaseSelected} onPress={() => setIsBaseSelected(!isBaseSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Baseball &#9918;" checked={isBaseballSelected} onPress={() => setIsBaseballSelected(!isBaseballSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Basketball &#127936;" checked={isBasketSelected} onPress={() => setIsBasketSelected(!isBasketSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="BMX &#128690;" checked={isBMXSelected} onPress={() => setIsBMXSelected(!isBMXSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Bodybuilding &#127947;" checked={isBodySelected} onPress={() => setIsBodySelected(!isBodySelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Canoeing &#128758;" checked={isCanoeSelected} onPress={() => setIsCanoeSelected(!isCanoeSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Canyoning &#127748;" checked={isCanyonSelected} onPress={() => setIsCanyonSelected(!isCanyonSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Caving &#128511;" checked={isCaveSelected} onPress={() => setIsCaveSelected(!isCaveSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Climbing &#129495;" checked={isClimbSelected} onPress={() => setIsClimbSelected(!isClimbSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Croquet &#127951;" checked={isCroquetSelected} onPress={() => setIsCroquetSelected(!isCroquetSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Cycling &#128692;" checked={isCycleSelected} onPress={() => setIsCycleSelected(!isCycleSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Darts &#127919;" checked={isDartsSelected} onPress={() => setIsDartsSelected(!isDartsSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Driving &#128663;" checked={isDriveSelected} onPress={() => setIsDriveSelected(!isDriveSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Fishing &#127907;" checked={isFishSelected} onPress={() => setIsFishSelected(!isFishSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Flag Football &#128681;" checked={isFlagSelected} onPress={() => setIsFlagSelected(!isFlagSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Flying Disc &#129359;" checked={isDiscSelected} onPress={() => setIsDiscSelected(!isDiscSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Football &#127944;" checked={isFootSelected} onPress={() => setIsFootSelected(!isFootSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Gymnastics &#129336;" checked={isGymSelected} onPress={() => setIsGymSelected(!isGymSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Handball &#129342;" checked={isHandSelected} onPress={() => setIsHandSelected(!isHandSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Hiking &#127957;" checked={isHikeSelected} onPress={() => setIsHikeSelected(!isHikeSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Horseback Riding &#128014;" checked={isHorseSelected} onPress={() => setIsHorseSelected(!isHorseSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Inline Skating &#9976;" checked={isInlineSelected} onPress={() => setIsInlineSelected(!isInlineSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Jogging &#127939;" checked={isJogSelected} onPress={() => setIsJogSelected(!isJogSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Jump Rope &#128255;" checked={isJumpSelected} onPress={() => setIsJumpSelected(!isJumpSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Karting &#127950;" checked={isKartSelected} onPress={() => setIsKartSelected(!isKartSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Kayaking &#128758;" checked={isKayakSelected} onPress={() => setIsKayakSelected(!isKayakSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Kite Surfing &#127940;" checked={isKiteSelected} onPress={() => setIsKiteSelected(!isKiteSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Lacrosse &#129357;" checked={isLacSelected} onPress={() => setIsLacSelected(!isLacSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Longboarding &#128761;" checked={isLongSelected} onPress={() => setIsLongSelected(!isLongSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Martial Arts &#129355;" checked={isMartSelected} onPress={() => setIsMartSelected(!isMartSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Motor Sports &#127949;" checked={isMotorSelected} onPress={() => setIsMotorSelected(!isMotorSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Mountain Biking &#128693;" checked={isMountSelected} onPress={() => setIsMountSelected(!isMountSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Mountaineering &#127956;" checked={isMount2Selected} onPress={() => setIsMount2Selected(!isMount2Selected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Netball &#129349;" checked={isNetSelected} onPress={() => setIsNetSelected(!isNetSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Paintball &#128299;" checked={isPaintSelected} onPress={() => setIsPaintSelected(!isPaintSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Paragliding &#128168;" checked={isParaSelected} onPress={() => setIsParaSelected(!isParaSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Parkour &#127939;" checked={isParkSelected} onPress={() => setIsParkSelected(!isParkSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Pickleball &#129358;" checked={isPickSelected} onPress={() => setIsPickSelected(!isPickSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Polo &#127943;" checked={isPoloSelected} onPress={() => setIsPoloSelected(!isPoloSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Powerlifting &#127947;" checked={isPowerSelected} onPress={() => setIsPowerSelected(!isPowerSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Rafting &#128675;" checked={isRaftSelected} onPress={() => setIsRaftSelected(!isRaftSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Rappelling &#129495;" checked={isRapSelected} onPress={() => setIsRapSelected(!isRapSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Road Biking &#128692;" checked={isRoadSelected} onPress={() => setIsRoadSelected(!isRoadSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Rock Climbing &#129495;" checked={isRockSelected} onPress={() => setIsRockSelected(!isRockSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Roller Skating &#128095;" checked={isRollSelected} onPress={() => setIsRollSelected(!isRollSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Rowing &#128675;" checked={isRowSelected} onPress={() => setIsRowSelected(!isRowSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Rugby &#127945;" checked={isRugSelected} onPress={() => setIsRugSelected(!isRugSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Running &#127939;" checked={isRunSelected} onPress={() => setIsRunSelected(!isRunSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Sailing &#9973;" checked={isSailSelected} onPress={() => setIsSailSelected(!isSailSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Scuba Diving &#128032;" checked={isScubaSelected} onPress={() => setIsScubaSelected(!isScubaSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Shooting &#128299;" checked={isShootSelected} onPress={() => setIsShootSelected(!isShootSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Skateboarding &#128761;" checked={isSkateSelected} onPress={() => setIsSkateSelected(!isSkateSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Skiing &#9975;" checked={isSkiSelected} onPress={() => setIsSkiSelected(!isSkiSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Skydiving &#128747;" checked={isSkySelected} onPress={() => setIsSkySelected(!isSkySelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Slacklining &#127795;" checked={isSlackSelected} onPress={() => setIsSlackSelected(!isSlackSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Snorkeling &#128032;" checked={isSnorkSelected} onPress={() => setIsSnorkSelected(!isSnorkSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Snowboarding &#127938;" checked={isSnowbSelected} onPress={() => setIsSnowbSelected(!isSnowbSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Snowmobiling &#9924;" checked={isSnowmSelected} onPress={() => setIsSnowmSelected(!isSnowmSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Snowshoeing &#127935;" checked={isSnowSelected} onPress={() => setIsSnowSelected(!isSnowSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Soccer &#9917;" checked={isSocSelected} onPress={() => setIsSocSelected(!isSocSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Surfing &#127940;" checked={isSurfSelected} onPress={() => setIsSurfSelected(!isSurfSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Swimming &#127946;" checked={isSwimSelected} onPress={() => setIsSwimSelected(!isSwimSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Table Tennis &#127955;" checked={isTabSelected} onPress={() => setIsTabSelected(!isTabSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Taekwondo &#129355;" checked={isTaeSelected} onPress={() => setIsTaeSelected(!isTaeSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Tai Chi &#129496;" checked={isTaiSelected} onPress={() => setIsTaiSelected(!isTaiSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Tennis &#127934;" checked={isTenSelected} onPress={() => setIsTenSelected(!isTenSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Thru-hiking &#127957;" checked={isThruSelected} onPress={() => setIsThruSelected(!isThruSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Volleyball &#127952;" checked={isVollSelected} onPress={() => setIsVollSelected(!isVollSelected)} />
                <CheckBox fontFamily='Avenir' checkedColor='#75d2ff' title="Water Polo &#129341;" checked={isWatSelected} onPress={() => setIsWatSelected(!isWatSelected)} />
            </ScrollView>
            <View style={{alignSelf: 'center', paddingBottom: 35}}>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#75d2ff', '#96a9d5', '#9fa4d0', '#bfa8e0', '#d7b1cd']}
                    start={[0, 1]} 
                    end={[1, 0]}
                    onPress={() => navigation.navigate('Home')}
                    style={styles.loginBtn}>
                    <TouchableOpacity onPress={() => {saveHobbies();}} style={styles.loginBtn}>
                        <Text style={styles.loginText}>Save Changes</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default AddHobby;