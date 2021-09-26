import React from 'react';
import { View, Text, Image, Alert } from "react-native";
import estilos from './estilos.js'

const Imagem = ({navigation})=>{
    

    return(
        <View>
            <Image
                style={[estilos.inyLogo]}
                source={require('../../assets/logo.jpeg')}
                accessibilityLabel="Imagem"
                blurRadius={2}
                onError={()=>Alert.alert('Erro ao carregar a imagem')}
                onLoad={()=>Alert.alert('Carregou galera')}
            />

            <Image
                accessibilityLabel="Imagem do react"
                style={[estilos.logo]}
                source={{uri:'https://reactnative.dev/img/tiny_logo.png' }}
                blurRadius={2}
                onError={()=>Alert.alert('Erro ao carregar a imagem')}
                onLoad={()=>Alert.alert('Carregou galera')}
                onLoadStart={()=>Alert.alert('Começou a carregar')}
                onProgress={()=>Alert.alert('Iniciou o processo de download')}
                fadeDuration={600}
                resizeMethod={'resize'}
               
            />

        </View>
    )
}

export default Imagem;