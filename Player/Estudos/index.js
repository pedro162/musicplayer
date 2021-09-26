import React, {useState, useEffect } from 'react';
import {SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, Alert, TouchableOpacity, FlatList, Button, KeyboardAvoidingView, TextInput } from 'react-native';
const DATA = [];

const getItem = (data, index)=>({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`
})

const getItemCount = (data)=>50;

const Item = ({title})=>(
    <View style={styles.item}>
        <Text style={styles.title} >{title}</Text>
    </View>
)

navigationOptions={
    drawerLable: 'Estudo',
    drawerIcon:(focused, tintColor)=>(
        <Image 
            style={styles.logo}
            style={{width: 40, height: 40}}
            source={require('../../assets/icon.png')}
        />
    )
}

const clicou=(navigation)=>{
    navigation.navigate('Music Player');
   // Alert.alert('Aui');
}

const App = ({navigation})=>{
    const [contador, setContador] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    const [count, setCount] = useState(0)

    const incremente = ()=>(
        setContador(contador + 1)
    )

    useEffect(()=>{
        const marcados = usuarios.filter(user=>user.marcado);
        setCount(marcados.length)
    }, [usuarios])

    useEffect(()=>{
        let data = []

        for(let i = 0; !(i == 50); i++){
            data.push( {id: (i + 1), nome: ('pedro -'+(i+1))})
        }

        setUsuarios(data)

    }, [])

    const marcar = (val)=>{
        const novosUsuarios = usuarios.map((usuario)=>{
            return usuario.id === val ? {...usuario, marcado: !usuario.marcado} : usuario
        })

        setUsuarios(novosUsuarios)
    }

    return(
        <KeyboardAvoidingView style={styles.container} 
            behavior="padding"
        >

            <TouchableOpacity onPress={()=>clicou(navigation)}>
                <Text>Navegar</Text>
            </TouchableOpacity>

            <StatusBar
                barStyle="dark-content"
                backgroundColor='#f9c2ff'
                hidden={false}
            />
            
            <TouchableOpacity
                onPress={()=>incremente()}
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', verticalAlign: 'center'}}
            >
                <Text style={{padding: 10, width: '80%', height: 50, backgroundColor: 'black', color: '#fff', borderRadius: 50, textAlign: 'center', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', margin: 'auto'}}>Contar</Text>
            </TouchableOpacity>

            <Contador val={contador}/>


            <Text
                 style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginVertical: 10,
                    padding: 10,
                    color: '#000'

                }}
            >
                Total de usuarios marcados: {count}
            </Text>

            <FlatList
                data={usuarios}
                renderItem={({item})=>(
                    <View>
                        <Text  style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                textAlign: 'center',
                                marginVertical: 10,
                                padding: 10,
                                color: '#000'

                            }} >
                            
                            {item.marcado && <Text style={{color: 'red'}} >*** </Text>}
                            {item.nome}
                        </Text>
                        <Button
                            title="Marcar"
                            onPress={()=>marcar(item.id)}
                        />
                    </View>
                )}

                keyExtractor={(item, index)=>(
                    index.toString()
                )}
            />
            
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={(item, index) => index.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
                initialScrollIndex={5}
            />

            <TextInput
                placeholder="Nome Completo"
            />
        </KeyboardAvoidingView>
    )
}

const Contador = ({val})=>(
    <Text style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 10,
        padding: 10,

    }}>
       O valor atual é {val}
    </Text>
)


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    item:{
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title:{
        fontSize: 32,
    },
    logo:{
        width: 150,
        height: 150,
        borderRadius: 100
    }
})

export default App;