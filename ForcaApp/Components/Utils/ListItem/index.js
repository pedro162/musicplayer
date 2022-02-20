import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LeftActions from '../LeftActions/index'
import RightActions from '../RightActions/index.js'

const ListItem = ({data,options_left, no_leftac_action, no_right_action, options_right, children}) => {

    return (
        <Swipeable
            renderLeftActions={(progress, dragX)=>{

                    if(no_leftac_action === true){
                        return null;
                    }

                    return <LeftActions
                    
                        progress={progress}
                        dragX={dragX}
                        options={options_left}
                    />
                }
            }
            renderRightActions = {(process, dragX)=>{
                if(no_right_action === true){
                    return null;
                }

                return <RightActions
                    progress={process}
                    dragX={dragX}
                    acao={()=>Alert.alert('Tarefa excluida')}
                    options={options_right}
                />
            }}
            onSwipeableLeftOpen={()=>Alert.alert('Ação')}
        >
            <View
                style={[estilos.container]}
            >
                {children} 
            </View>
        </Swipeable>
    )
}

export default ListItem


const estilos  = StyleSheet.create({
    container:{
        backgroundColor:'#008B8B',
        width:'100%',
        height:'auto'
    },
})