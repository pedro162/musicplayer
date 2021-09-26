import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import estilos from './estilos.js'
import PlayerContext from '../../Context/PlayerContex';
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import Separator from '../../Components/Separator/index.js'

const ControlBottom = (props)=>{
    
    const [showDetalhes, setShowDetalhes] = React.useState(false)

    const [tocandoTthis,setTocandoThis] = React.useState(false)
    const [pausa,setPausa] = React.useState(false)
    
    const {tocando, setTocando, time, setTime, sound, playSound, pouse, setTopouse, pouseSound, stopSound, loadStatus, idMusicAtual, listAtual, dataMusicAtual, goNext, goPrv} = React.useContext(PlayerContext)

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
            await pouseSound();
        }
       
        //setTocandoThis(false)
        setPausa(true)
    }

    return(
        <View
            style={[estilos.container]}
        >

                
                   
                    <View
                        style={[{flexDirection:'row', width: '100%', justifyContent:'center', alignItems:'center', marginTop:0}]}
                    >
                        <View
                            style={[{width: (showDetalhes ? '10%': '100%'), justifyContent:'flex-start', textAlign:'left', alignItems:'flex-start', marginTop:0}]}
                        >
                            <TouchableOpacity
                                onPress={()=>setShowDetalhes(!showDetalhes)}
                            >
                                {
                                    showDetalhes ? 
                                        <FontaWesome5
                                            style={[{textAlign:'left',padding:5, marginTop: 0, marginBottom: 0,marginLeft: 8,flexDirection:'column', justifyContent:'flex-start', alignItems:'center', fontSize:30},estilos.textAddPlayLyst]}
                                            name='angle-up' color="#fff" size={25}
                                        />
                                    :
                                        <FontaWesome5
                                            style={[{textAlign:'left', padding:5,marginTop: 0, marginBottom: 8,marginLeft: 8,flexDirection:'column', justifyContent:'flex-start', alignItems:'center', fontSize:30},estilos.textAddPlayLyst]}
                                            name='angle-down' color="#fff" size={25}
                                        />
                                }
                            
                            </TouchableOpacity>
                        </View>

                        { showDetalhes && 
                       
                            <View
                                style={[{width: '90%', flexDirection:'column' ,justifyContent:'center', alignItems:'center', marginTop:0}]}
                            >

                            
                                <View
                                    style={[estilos.controlers]}
                                >
                                    <View>
                                        <TouchableOpacity
                                            onPress={()=>goPrv()}
                                        >

                                            <FontaWesome5
                                                style={[{textAlign:'center', marginTop: 18,justifyContent:'center', alignItems:'center', fontSize:25},estilos.textAddPlayLyst]}
                                                name='step-backward' color="#fff" size={11}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        
                                        {
                                        ((tocando  == true && pouse == false))

                                            ?
                                                (
                                                    <TouchableOpacity
                                                        onPress={()=>pouseSound()}
                                                    >
                                                        <FontaWesome5
                                                            style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:25},estilos.textAddPlayLyst]}
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
                                                                style={[{textAlign:'center', marginTop: 18, justifyContent:'center', alignItems:'center', fontSize:25},estilos.textAddPlayLyst]}
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
                                                            style={[{textAlign:'center', marginTop: 18,justifyContent:'center', alignItems:'center', fontSize:25},estilos.textAddPlayLyst]}
                                                            name='play-circle' color="#fff" size={11}
                                                        />


                                                    </TouchableOpacity>
                                                )
                                        
                                        }

                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={()=>goNext()}
                                        >
                                            <FontaWesome5
                                                style={[{textAlign:'center', marginTop: 18,justifyContent:'center', alignItems:'center', fontSize:25},estilos.textAddPlayLyst]}
                                                name='step-forward' color="#fff" size={11}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View
                                        style={[estilos.artista_musica]}
                                    >
                                    <Text
                                        style={[{fontSize:14, color: '#fff', flexDirection: 'column', alignItems:'center', textAlign:'center'}]}
                                    >
                                        {dataMusicAtual ? dataMusicAtual.artist+ ' | ' + dataMusicAtual.title : 'Atista | Nome da música'}
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                 
           
           <View
                style={{width: '100%', height:1, backgroundColor: '#000' }}
            >
                
            </View>
        </View>
    )
}

export default ControlBottom;