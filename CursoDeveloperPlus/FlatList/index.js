import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Table = (props)=>{
    return(
        <>
        <View
            style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}
        >
            <Text>Cod</Text>
            <Text>Cliente</Text>
            <Text>Valor</Text>
        </View>
        
            {props.children}
        </>
    )
}

const FlatListItem = ({navigation})=>{


    const navegarSectionList = ()=>{
        navigation.navigate('SectionListApp');
    }

    let dados = [];
    for(let i = 0; !(i == 300000000); i++){
        dados.push(
            {'key': (i+1), 'cliente': 'Pedro aguiar - '+(i+1), 'rca': 'Lucyana - '+(i+1), 'cdRca': (i+1), 'vrReceber': (i+1)*3},
        )

    }

    const contaReceber = dados;
    return(
        <View>
            <Table
                         
                         >
            <FlatList
                data={contaReceber}
                renderItem={
                    ({item})=>(
                        <View
                                style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}
                            >
                            <Text>{item.key}</Text>
                            <Text>{item.cliente}</Text>
                            <Text>{item.vrReceber}</Text>
                        </View>
                    )
                }
                keyExtractor={item => item.key}
            />
            </Table>

            <TouchableOpacity
                onPress={()=>navegarSectionList()}
            >
                <Text
                     style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50}}
                >SectionListApp</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FlatListItem;