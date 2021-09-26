import React from 'react';
import {View, Text, TextInput, SafeAreaView, Image} from 'react-native';
import estilos from './estilos.js'

const Input = ()=>{

    const [nome, setNome] = React.useState('')
    const [numero, setNumero] = React.useState('')
    return(
        <SafeAreaView>

            <Image
                src={require('../../assets/logo.jpeg')}
            />
            <TextInput
                style={[estilos.input]}
                onChange={(text)=>setNome(text)}
                value={nome}
                numberOfLine={4}
                underlineColorAndroid="#fff"
                autoCapitalize="none"
                autoCompleteType='username'
                autoCorrect={true}
                autoFocus={true}
                blurOnSubmit={true}
                clearButtonMode={'always'}
                contextMenuHidden={true}
                defaultValue="Seu nome"
                disableFullscreenUI={true}
                editable={true}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance="dark"
                
            />

            <TextInput
                style={[estilos.input]}
                onChange={(text)=>setNumero(text)}
                value={numero}
                placeholder="Digite seu número"
                keyboardType='phone-pad'
                keyboardAppearance="dark"
                
            />
        </SafeAreaView>
    )
}

export default Input;