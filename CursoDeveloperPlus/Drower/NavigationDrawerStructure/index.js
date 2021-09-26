import React from 'react';
import {View, Text, TouchableOpacity, Imgage} from 'react-native';

const NavigationDrawerStructure = ({navigationProps})=>{

    const toggleDrawer = ()=>{
        navigationProps.toggleDrawer()
    }
    return(
        <View
            style={[{flexDirection: 'row'}]}
        >
            <TouchableOpacity
                onPress={()=>navigationProps()}
            >
               <Imgage
                    source ={require('../../../assets/rastreio.png')}
                    style={{width: 25, height: 25, marginLeft:5}}
               />

            </TouchableOpacity>
            
        </View>
    )
}

export default NavigationDrawerStructure;