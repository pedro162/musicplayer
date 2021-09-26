import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import Separator from '../../Components/Separator/index.js'
import ListItem from '../../Components/ListItem/index.js'
import Header from '../../Components/Header/index.js'
import ControlBottom from '../../Components/ControlBottom/index.js'
import estilos from './estilos.js'
import PlayerContext from '../../Context/PlayerContex';

import songs from "../../Songs/data.js";

const Recentes = props => {
    console.log(songs)
    //setListAtual
    const {setListAtual} = React.useContext(PlayerContext)
    

    React.useEffect(()=>{
        setListAtual(songs)
    }, [songs])

    return (
        <View style={[estilos.container]}>
            <Header title="Play List" />
            <FlatList
                data={songs}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    console.log(item.id)
                    return <ListItem
                        data={item}
                    />
                }}
                ItemSeparatorComponent={()=><Separator/>}
                style={{backgroundColor: '#000', paddingRight: 10, paddingLeft:10}}
            />

            <ControlBottom/>
        </View>
    )
}


export default Recentes