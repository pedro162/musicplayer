import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const RightActions = ({progress, dragX, acao}) => {
    const scale = dragX.interpolate({
        inputRange:[-100, 0],
        outputRange:[1, 0],
        extrapolate:'clamp'
    })

    return (
       
            
            <View
                style={[estilos.rightActions]}
            >
                 <TouchableOpacity
                    onPress={()=>acao()}
                >
                            <Text
                                style={[estilos.actionText]}
                            >
                                Excluir
                            </Text>
                 </TouchableOpacity>
            </View>
       
    )
}


export default RightActions

const estilos = StyleSheet.create({
    rightActions:{
        backgroundColor: 'red',
        justifyContent:'center',
    },
    actionText:{
        fontSize: 17,
        color: '#fff'
    }
})
