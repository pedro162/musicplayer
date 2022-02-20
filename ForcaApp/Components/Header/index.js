import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const  Header = ({title, navigation, navegateTo, icon, back})=>{
    
    const navegarSettings = ()=>{
        navigation.navigate( navegateTo ? navegateTo : 'Settings')
        return true;
    }

    return(
        <View
            style={[estilos.container]}
        >

            <StatusBar
                animated={true}
                backgroundColor="#008B8B"
                barStyle={'dark-content'}
                showHideTransition={true}
                hidden={false}
             />

            <View
                style={[estilos.perfil]}
            >
                {
                    back ?

                    (

                        <TouchableOpacity 
                            onPress={()=>navigation.goBack()}
                        >
                            <FontaWesome5 name='arrow-left' color="#FFF" size={26} />
                           
                        </TouchableOpacity>
                    )
                    :
                    (
                        <FontaWesome5 name='user' color="#FFF" size={26} />
                    )

                }
                 

                
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
                <TouchableOpacity 
                    onPress={()=>navegarSettings()}
                >
                    {
                        icon ? 
                            (icon)
                        : (

                            <FontaWesome5 name='cog' color="#fff" size={26} />
                        )
                    }

                   
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Header;