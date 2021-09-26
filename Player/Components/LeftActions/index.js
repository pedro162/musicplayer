import React from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

const LeftActions = ({progress, dragX}) => {
    const scale = dragX.interpolate({
        inputRange:[0, 100],
        outputRange:[0,1],
        extrapolate:'clamp'
    })
    return (
        <View
            style={[estilos.LeftActions]}
        >
            <Animated.Text
                style={[estilos.actionTtext, {transform:[{scale}]}]}
            >.. Anime left ..</Animated.Text>
        </View>
    )
}
export default LeftActions

const estilos = StyleSheet.create({
    LeftActions:{
        backgroundColor: '#388e3c',
        justifyContent: 'center',
    },
    actionTtext:{
        fontSize: 17,
        color: '#fff',
        padding: 20
    }
})
