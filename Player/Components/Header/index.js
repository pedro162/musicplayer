import React from 'react';
import {View, Text} from 'react-native'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const  Header = ({title})=>{

    return(
        <View
            style={[estilos.container]}
        >
            <View
                style={[estilos.perfil]}
            >
                <FontaWesome5 name='user' color="#fff" size={26} />
            </View>

            <View
                style={[estilos.title]}
            >
                <Text
                    style={[estilos.title]}
                >
                    {title ? title: 'Titulo padrão'}
                </Text>

            </View>

            <View
                style={[estilos.perfil]}
            >
                <FontaWesome5 name='cog' color="#fff" size={26} />
            </View>

        </View>
    )
}

export default Header;