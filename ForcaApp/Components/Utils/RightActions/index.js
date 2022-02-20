import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const RightActions = ({progress, dragX, options, acao}) => {
    const scale = dragX.interpolate({
        inputRange:[-100, 0],
        outputRange:[2, 0],
        extrapolate:'clamp'
    })




    return (
       
            <>
                {
                    Array.isArray(options) && options.length > 0
                    ?
                    (
                        options.map((item, index, arr)=>{
                            let labelOption = item.hasOwnProperty('label')              ? item.label        : '';
                            let action      = item.hasOwnProperty('action')             ? item.action       : '';
                            let propsLabel  = item.hasOwnProperty('propsLabel')         ? item.propsLabel   : '';
                            let propsBoxLabel  = item.hasOwnProperty('propsBoxLabel')         ? item.propsBoxLabel   : '';

                            return(
                                    <View
                                        key={`actin${index}-${item}-${arr.length}`}
                                        style={[estilos.rightActions]}
                                        {...propsBoxLabel}
                                    >
                                         <TouchableOpacity
                                            onPress={()=>action()}
                                        >
                                                    <Text
                                                        style={[estilos.actionText]}
                                                        {...propsLabel}
                                                    >
                                                        {labelOption}
                                                    </Text>
                                         </TouchableOpacity>
                                    </View> 
                            )
                        })
                    )
                    :
                    (
                        <View
                            style={[estilos.rightActionsEdit]}
                        >
                             <TouchableOpacity
                                onPress={()=>acao()}
                            >
                                        <Text
                                            style={[estilos.actionText]}
                                        >
                                            Standard
                                        </Text>
                             </TouchableOpacity>
                        </View>  
                    )

                }
                 
                
            </>
       
    )
}


export default RightActions

const estilos = StyleSheet.create({
    rightActions:{
        backgroundColor: 'red',
        justifyContent:'center',
    },
    rightActionsEdit:{
        backgroundColor: '#00BFFF',
        justifyContent:'center',
    },
    actionText:{
        fontSize: 17,
        color: '#fff',
        paddingRight:10,
        paddingLeft:10,

    }
})
