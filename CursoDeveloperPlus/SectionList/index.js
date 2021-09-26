import React from 'react';
import {View, Text, SectionList} from 'react-native';
import estilos from './estilos.js'

const SectionListApp = ({navigation})=>{

    let dados = [];
    for(let j=0; !(j == 13); j++){
        let subDados = [];
        for(let i = 0; !(i == 30000); i++){
           
            subDados.push(
                {'key': (i+1), 'cliente': 'Pedro aguiar - '+(i+1), 'rca': 'Lucyana - '+(i+1), 'cdRca': (i+1), 'vrReceber': (i+1)*3},
            )

        }
        dados.push({'title': 'Seção ->'+(j), 'data':subDados})

    }


    return (
        <View>
            <Text>Bem-Vindo ao SectionList</Text>
            <SectionList
                sections={
                    dados
                }
                renderItem={({item})=>(
                    <Text style={estilos.item} key={item.key}>{item.cliente}</Text>
                )}
                renderSectionHeader={({section})=><Text style={estilos.sectionHeader} >{section.title}</Text>}
                keyExtractor={(item, index)=>index}
            />
        </View>
    )


}

export default SectionListApp;