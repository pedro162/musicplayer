 

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
//import TrackPlayer from 'react-native-track-player';

import songs from "../Songs/data";
import Controller from "../Controller/index";
import TrackPlayerEvents from "react-native-track-player/lib/eventTypes";
import { Audio } from 'expo-av';
//import { add, play, reset, setupPlayer } from "react-native-track-player";

const { width, height } = Dimensions.get("window");

export default function Player() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = React.useState()
  const [tocando, setTocando] = React.useState(true)
  const [intervalo, setIntervalo] = React.useState(null)

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const isPlayerRead = useRef(false)

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);

     
    });


    return () => {
      scrollX.removeAllListeners();
    };

  }, []);


   const  playSound =  async ()=>{
     
  
        console.log('Loading Sound');
        const {sound}= await Audio.Sound.createAsync({uri: songs[songIndex].url})
        Audio.setAudioModeAsync({
          staysActiveInBackground: true
        })
        setSound(sound)
        console.log('Playin Sound');
        //await sound.playAsync()
        await sound.replayAsync()
        let status = await sound.getStatusAsync();

        if(tocando && status.isPlaying){
         //
        }
        await console.log('status', status);
    

  }

   

  useEffect(()=>{
    return sound ? ()=>{
      console.log('Unloading Sound')
      sound.unloadAsync();
    }
    : undefined
  }, [sound])

  useEffect(()=>{
    if(tocando == true){
      playSound()

    }

  }, [songIndex])

  useEffect(()=>{
      if(tocando == true){
        playSound()

      }else{
        parar()
      }
  }, [tocando])
  

  const parar = async ()=>{

   
    console.log('Stoping Sound');
    const {sound}= await Audio.Sound.createAsync({uri: songs[songIndex].url})
    Audio.setAudioModeAsync({
      staysActiveInBackground: true
    })
    setSound(sound)
    console.log('Stoping Sound');
    //await sound.stopAsync()
    await sound.pauseAsync()
    
   
  }

  const stopSound = async ()=>{

   // console.log('Stoping Sound');
   // const {sound}= await Audio.Sound.createAsync({uri: songs[songIndex].url})
    //Audio.setAudioModeAsync({
     // staysActiveInBackground: true
   // })
   // setSound(sound)
    //console.log('Stoping Sound');
    //await sound.stopAsync()
    await sound.stopAsync()

  }

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });

  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });

  };

  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={{uri: item.artwork}}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
      </View>

      <Controller onNext={goNext} onPrv={goPrv} playSound={playSound} parar={parar} setTocando={setTocando} tocando={tocando} index={songIndex} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-evenly",
    height: height,
    maxHeight: 500,
  },
});