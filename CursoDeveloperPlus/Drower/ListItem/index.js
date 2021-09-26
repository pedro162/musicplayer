import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LeftActions from '../LeftActions/index'
import RightActions from '../RightActions/index.js'

const ListItem = ({data}) => {
    return (
        <Swipeable
            renderLeftActions={(progress, dragX)=>{

                    return <LeftActions
                    
                        progress={progress}
                        dragX={dragX}
                    />
                }
            }
            renderRightActions = {(process, dragX)=>{
                return <RightActions
                    progress={process}
                    dragX={dragX}
                    acao={()=>data.excluir('Tarefa excluida')}
                />
            }}
            onSwipeableLeftOpen={()=>data.concluir(data.tarefa)}
        >
            <View
                style={[estilos.container]}
            >
                <Text
                    style={[estilos.text]}
                >{data.tarefa}</Text>   
            </View>
        </Swipeable>
    )
}

export default ListItem


const estilos  = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:20
    },
    text:{
        fontSize: 17,
        color:'#222'
    }
})