import React from 'react';
import {View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import estilos from './estilos.js'

const HomeScreen = ({navigation})=>{

    const navegarHome = ()=>{
        navigation.navigate('Home', {'dados': [{'item': 'Celular', 'preco': 12}, {'item': 'PC', 'preco': 12}]})
    }

    const voltar = ()=>{
        navigation.goBack()
    }

    const navegaTopo = ()=>{
        navigation.popToTop()
    }

    return(
        <View 
            style={estilos.estilos}
        >
            <View
                style={{justifyContent: 'center'}}
            >
                <Text 
                    onLayout={()=>{
                        console.log('mudou o layout')
                    }}
                selectable={true} style={estilos.texto}>Bem-Vindo ao HomeScreen</Text>

                <TouchableOpacity
                    onLongPress={()=>navegarHome()}
                >
                    <Text
                        style={{textAlign: 'center', borderRadius: 50, padding: 10, backgroundColor: 'blue', margin: 10, color: '#fff', marginBottom: 10}}
                    >Navegar Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>voltar()}
                >
                    <Text
                        style={{textAlign: 'center', borderRadius: 50, padding: 10, backgroundColor: 'blue', margin: 10, color: '#fff', marginBottom: 10}}
                    >Noltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navegaTopo()}
                >
                    <Text
                        style={{textAlign: 'center', borderRadius: 50, padding: 10, backgroundColor: 'blue', margin: 10, color: '#fff', marginBottom: 10}}
                    >Topo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen;