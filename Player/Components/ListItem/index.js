import React from 'react'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, Text, StyleSheet, Animated} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LeftActions from '../LeftActions/index'
import RightActions from '../RightActions/index.js'
import {playSound, parar as playStop} from '../../Functions/index.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayerContext from '../../Context/PlayerContex';

const ListItem = ({data}) => {
    console.log(data)
    
    const [tocandoTthis,setTocandoThis] = React.useState(false)
    const [pausa,setPausa] = React.useState(false)
    
    const {tocando, setTocando, time, setTime, sound, playSound, pouse, setTopouse, pouseSound, stopSound, loadStatus, idMusicAtual, listAtual} = React.useContext(PlayerContext)

    const tocar = async (url, id=null)=>{
        
        if(tocando){
            stopSound();
        }

        await playSound(url, id)
        
        if(pausa){
            setPausa(false)
        }
        setTocandoThis(true)
        
    }

    const parar = async ()=>{

        if(tocando){
            pouseSound();
        }
       
        //setTocandoThis(false)
        setPausa(true)
    }
   

    React.useEffect(() => {

        if(idMusicAtual &&  idMusicAtual != data.id){
            setTocandoThis(false)
        }else  if(idMusicAtual &&  idMusicAtual == data.id){
            setTocandoThis(true)
        }


        console.log('----------------------------------- Atual id -----------------------------')
        console.log(data.id)
        console.log(data)
        console.log(idMusicAtual)
        console.log('----------------------------------- Atual id -----------------------------')

    }, [data, idMusicAtual, setTocandoThis, tocando]);

    console.log('statu here ===========================')
    console.log( loadStatus())

    return (
       
            <Animated.View
                style={[estilos.container]}
            >
                <View
                    style={[estilos.img_artista]}
                >
                    <Animated.Image
                        source={{uri: data.artwork}}
                        style={{ width: 60, height: 60}}
                    />
                </View>

                <View
                    style={[estilos.artista]}
                >
                    <Text
                        style={[estilos.textArtista]}
                    >
                        {data.artist}
                    </Text> 

                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        textAlign: 'left'

                    }}>

                        <Text
                            style={[{textAlign: 'left', marginRight: 10, justifyContent:'center', alignItems:'center'}, estilos.textAddPlayLyst]}
                        >
                            <FontaWesome5
                                style={[{justifyContent:'center', alignItems:'center'}]}
                                name='plus' color="#fff" size={11}
                             />    
                        </Text> 
                        
                        <Text
                            style={[{textAlign: 'left'}, estilos.textAddPlayLyst]}
                        >
                            Playlyst    
                        </Text> 
                    </View>
                </View>

                <View
                    style={[estilos.controle]}
                >
                    {
                       tocandoTthis 

                    ?
                               /* pausa 
                                    ? 
                                        <TouchableOpacity
                                                onPress={()=>tocar(data.url, data.id)}
                                            >
                                                <FontaWesome5
                                                    style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                                                    name='play' color="#fff" size={11}
                                                />
                    
                    
                                        </TouchableOpacity>
                                    : 

                                        <TouchableOpacity
                                            onPress={()=>parar()}
                                        >
                                            <FontaWesome5
                                                style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                                                name='pause' color="#fff" size={11}
                                            />
                
                
                                        </TouchableOpacity>*/
                                        ((tocando  == true && pouse == false))

                                            ?
                                                (
                                                    <TouchableOpacity
                                                        onPress={()=>pouseSound()}
                                                    >
                                                        <FontaWesome5
                                                             style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                                                            name='pause' color="#fff" size={11}
                                                        />


                                                    </TouchableOpacity>
                                                )
                                            

                                        :
                                            
                                            (tocando  == true && pouse == true)
                                                
                                            ?
                                                (
                                                    <TouchableOpacity
                                                            onPress={()=>playSound(dataMusicAtual.url, dataMusicAtual.id)}
                                                        >
                                                            <FontaWesome5
                                                                 style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                                                                name='play' color="#fff" size={11}
                                                            />


                                                    </TouchableOpacity>
                                                )
                                            :
                                                
                                    
                                                ( 
                                                    <TouchableOpacity
                                                        onPress={()=>pouseSound(dataMusicAtual.url, dataMusicAtual.id)}
                                                    >
                                                        <FontaWesome5
                                                             style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                                                            name='play-circle' color="#fff" size={11}
                                                        />


                                                    </TouchableOpacity>
                                                )
                                

                   :
                   
                       <TouchableOpacity
                           onPress={()=>tocar(data.url, data.id)}
                       >
                           <FontaWesome5
                               style={[{textAlign:'center', marginTop: 18,justifyContent:'center', alignItems:'center', fontSize:20},estilos.textAddPlayLyst]}
                               name='play-circle' color="#fff" size={11}
                           />


                       </TouchableOpacity>
                    
                    }
                    
                </View>
            </Animated.View>
    )
}

export default ListItem


const estilos  = StyleSheet.create({
    container:{
        paddingHorizontal:5,
        paddingVertical:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    textArtista:{
        fontSize: 17,
        color:'#fff'
    },
    textAddPlayLyst:{
        color:'#fff'
    },
    artista:{
        flexGrow:10,
        textAlign: 'left'
    },
    img_artista:{
        flexGrow:1,
    },
    controle:{
        flexGrow:1,
    }
})