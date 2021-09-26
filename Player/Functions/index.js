
import { Audio } from 'expo-av';

const parar = async (url)=>{

   
    console.log('Stoping Sound');
    const {sound}= await Audio.Sound.createAsync({uri: url})
    Audio.setAudioModeAsync({
        staysActiveInBackground: true
    })
    console.log('Stoping Sound');
    //await sound.stopAsync()
    await sound.pauseAsync()

    return sound;
}

const  playSound =  async (url)=>{
    

    console.log('Loading Sound');
    const {sound}= await Audio.Sound.createAsync({uri: url})
    Audio.setAudioModeAsync({
        staysActiveInBackground: true
    })

    await sound.replayAsync()
    let status = await sound.getStatusAsync();

    console.log(status)

    return sound;

}



export {parar, playSound}