import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Player from './Player/index';
import Home from './Home/index.js';
import PlayerContext from './Context/PlayerContex.js';
import { Audio } from 'expo-av';

const Navegacao = createStackNavigator();

const Routes = (props)=>{
    
    const sound = React.useRef(new Audio.Sound());
    console.log(sound)

    const[tocando, setTocando]              = React.useState(false);
    const[pouse, setTopouse]                = React.useState(false);
    const[time, setTime]                    = React.useState(null);
    const[status, setStatus]                = React.useState(null) 
    const[idMusicAtual, setIdMusicAtual]    = React.useState()
    const[listAtual, setListAtual]          = React.useState(null)
    const[songIndex, setSongIndex]          = React.useState(0);
    const[typeShowList, setTypeShowList]    = React.useState('list')
    const [dataMusicAtual, setDataMusicAtual] = React.useState({})

    const slider = React.useRef(null)

    React.useEffect(() => {
        return () => sound.current.unloadAsync();
    }, []);

    React.useEffect(()=>{

        if(Array.isArray(listAtual) && listAtual.length > 0){
            let atual = listAtual.filter((item, index, listAtual)=>{
                if(item.id == idMusicAtual){
                    setSongIndex(index);
                    return true;
                }
            
            })
            console.log('------------------')
            console.log(atual)
            console.log('------------------')
            if(Array.isArray(atual) && atual.length > 0){
                atual=  atual[0];
                setDataMusicAtual({
                    title: atual.title ,
                    artist: atual.artist ,
                    artwork: atual.artwork,
                    url: atual.url,
                    id: atual.id 
                })
                
            }
        }

    }, [listAtual, idMusicAtual])

    React.useEffect(() => {
        const tocar = async ()=>{
            let dataAtual = listAtual[songIndex]
            await stopSound();
            await playSound(dataAtual.url, dataAtual.id)
        }

        tocar();
    }, [songIndex]);

    const playSound = async (url, id=null)=>{
        
        try {
            
            const checkLoaded = await sound.current.getStatusAsync();
            setTopouse(false)
            setTocando(false)

            if(checkLoaded.didJustFinish == false && id && id == idMusicAtual ){
                await sound.current.playAsync();
                setTocando(true)
                return true;
            }

            sound.current.unloadAsync();
            
            stopSound();

            if(tocando == true){
                //await pouseSound()
            }
            console.log("Loading Sound");
            
            console.log("playing sound");
            const result = await sound.current.loadAsync({ uri: url }, {}, true);

            const checkLoadedNow = await sound.current.getStatusAsync();
            if(checkLoadedNow.isLoaded){

                await sound.current.playAsync();
                Audio.setAudioModeAsync({
                   staysActiveInBackground: true
                 })
                setTocando(true)
                
            }else{
                console.log('Error in loading music')
            }
            console.log('----------------------------Url musica aqui ------------------------------------------------')
            console.log(id)
            console.log(sound)
            console.log('----------------------------Url musica aqui ------------------------------------------------')
            
            setIdMusicAtual(id)

        } catch (error) {
            console.log(error)
        }
    }

    const pouseSound = async ()=>{

        const checkLoaded = await sound.current.getStatusAsync();
        if(checkLoaded.isPlaying === true){
            await sound.current.pauseAsync()
            //setTocando(false)
            setTopouse(true)
        }

        let check2 = await sound.current.getStatusAsync();
        console.log('Status 02 ')
        console.log(check2)
        
    }

    const stopSound = async ()=>{
        const checkLoaded = await sound.current.getStatusAsync();
        if(checkLoaded.isPlaying === true){
            //await sound.current.stopAsync()
        }

        setTocando(false)
    }
    const loadAudio = async (url) => {
        const checkLoading = await sound.current.getStatusAsync();
        try {
          const result = await sound.current.loadAsync({ uri: url }, {}, true);
          if (result.isLoaded === false) {
            console.log('Error in Loading Audio');
          } else {
            playSound();
          }
        } catch (error) {
          console.log('Error in Loading Audio');
        }
      };
    
    const loadStatus = async ()=>{
        const checkLoaded = await sound.current.getStatusAsync();
        return checkLoaded;
    }

    const formatTimeMusic = (seconds)=>{
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
        const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';

        return `${hrs}${mins}${scnds}`;
    }

    const goNext = () => {

        if(! (Array.isArray(listAtual) && listAtual.length > 0) ){
            return false;
        }

        if((listAtual.length > (songIndex+1)) ){

            if(String(typeShowList).trim()== 'list'){
                

                    setSongIndex(songIndex + 1)
            
                

            }else{
                slider.current.scrollToOffset({
                    offset: (songIndex + 1) * width,
                });
            }
        }

    };
    const goPrv = () => {

        if(! (Array.isArray(listAtual) && listAtual.length > 0) ){
            return false;
        }

        if(! (songIndex <= 0) ){
        
            if(String(typeShowList).trim()== 'list'){

                setSongIndex(songIndex - 1) 

            }else{
                slider.current.scrollToOffset({
                    offset: (songIndex - 1) * width,
                });
            }
        }
       

    };

    
    return(
        <PlayerContext.Provider
            value={{tocando, setTocando, time, setTime, sound, playSound, pouse, pouseSound, setTopouse, stopSound, loadStatus, idMusicAtual, listAtual, setListAtual, songIndex, setSongIndex, typeShowList, setTypeShowList, dataMusicAtual, setDataMusicAtual, goNext, goPrv}}
        >
            <NavigationContainer>
                <Navegacao.Navigator initialRouteName="Home"
                    screenOptions={{
                        headerShown:false
                      }}
                
                >
                    <Navegacao.Screen name="Music Player" component = { Player }   />
                    <Navegacao.Screen name="Home" component={Home}   />
                </Navegacao.Navigator>
            </NavigationContainer>
        </PlayerContext.Provider>
    )
    
}

export default Routes
