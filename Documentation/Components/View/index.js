import React from 'react';
import {View, Text} from 'react-native';

const ViewComponent = ({navigation})=>{

    const home = ()=>{
        return navigation.navigate('Home')
    }

    return(
        <View 
            style={{flexDirection: 'row', height: 100, padding: 20 }}
            onStartShouldSetResponder={()=>{alert('oik')}}

            accessibilityRole={'search'}
        >
            <View
                style={{backgroundColor: 'blue', flex: 0.3}}
            />
            <View
                style={{backgroundColor: 'red', flex: 0.5}}
            />
            <Text>Hellow Word View-Component</Text>
        </View>
    )
}

export default ViewComponent;