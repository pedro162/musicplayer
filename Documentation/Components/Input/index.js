import React from 'react';
import {View, Text, TextInput} from 'react-native'

const Input = ()=>{


    return(
        <>
            <TextInput
                onChangeText={(val)=>setValue(val)}
                value={value}
                keyboardType="numeric"
            />
        </>
    )
}

export default Input;