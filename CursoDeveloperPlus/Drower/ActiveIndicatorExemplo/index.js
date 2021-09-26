import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'
import estilos from './estilos.js'

const ActiveIndicatorExemplo = ({size, color})=>{
    const [active, setActive] = React.useState('');

    React.useEffect(()=>{
        setActive(true)
        setTimeout(()=>{
            setActive(false)
        }, 5000)

        setTimeout(()=>{
            setActive(true)
        }, 9000)
    },
    [])
    return(
        <View style={[estilos.container]}>
            <ActivityIndicator animating={active} size={size ? size : 'large'} color={color ? color : 'red'}/>
        </View>
    )
}

export default ActiveIndicatorExemplo
