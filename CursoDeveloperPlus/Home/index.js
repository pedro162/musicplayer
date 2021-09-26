import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../Input/index.js'

const Home  = ({navigation, route})=>{
    const [data, setData] = useState('')

    const navegaToque = ()=>{

        return navigation.navigate('Toque');
    }

    const navegarSectionList = ()=>{
        navigation.navigate('SectionListApp');
    }

    const navegarAnimatedComponent = ()=>{
        return navigation.navigate('AnimatedComponent');
    }

    const navegarHomeScreen = ()=>{
        return navigation.navigate('HomeScreen')
    }

    const navegarImagem = ()=>{
        return navigation.navigate('Imagem')
    }

    return(
        <View
            style={{padding: 40}}
        >
            <Text>Bem-Vindo ao Home</Text>

            <Input
            
            />
            <TextInput
            
                style={{height: 50, fontSize: 30}}
                placeholder="Digite aqui para traduzir!"
                onChangeText={text=>setData(text)}

            />
                <Text
                    style={{padding: 10, fontSize: 50}}
                >
                    {data.split(' ').map((word)=>(
                        word.trim().length > 0 ? word.trim() : ''
                    ))}
                </Text>

                <TouchableOpacity
                    onPress={()=>navegarImagem()}
                >
                    <Text
                         style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                        
                    >Imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navegaToque()}
                >
                    <Text
                         style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                        
                    >Toques</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>navegarSectionList()}
                >
                    <Text
                        style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                    >SectionListApp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navegarAnimatedComponent()}
                >
                    <Text
                         style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                    >AnimatedComponent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navegarHomeScreen()}
                >
                    <Text
                         style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                    >navegarHomeScreen</Text>
                </TouchableOpacity>

                <View>
                    {route.params && route.params.dados.map((item, index)=>(<Text key={index}>{item.item+' - '+item.preco}</Text>)) }
                </View>

                
        </View>
    )
}

export default Home;