import React from 'react';
import {StyleSheet, View, Image, TextInput, AsyncStorage, Keyboard, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            qtdRegistros: 0
        }
    }

    static navigationOptions={
        drawerLabel: 'Settings',
        drawerIcon:({focused, tintColor})=>(
            <Image
                style={styles.logo}
                style={{width: 40, height: 40}}
                source={require('../../assets/icon.png')}
            />
        )
    }

    setQtdRegistros(val){
        this.setState({qtdRegistros: val})
    }

    async gravarTotal(){
        try{

            await AsyncStorage.setItem('@CGK_API', this.state.qtdRegistros);
            Keyboard.dismiss()
            Alert.alert('Sucesso', 'Gravado com sucesso')

        }catch(e){
            Alert.alert('Erro', e)
        }
    }

    render(){
        return(
            <View style={styles.container} >
                Bem-Vindo ao Settings
                <TextInput
                    style={styles.input}
                    placeholder="Qtd registros default para API"
                    onChangeText={this.setQtdRegistros.bind(this)}
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={this.gravarTotal.bind(this)}
                >
                    <Text style={styles.textBotao}>Gerar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles  = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    input:{
        marginTop: 10,
        width: 250,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 4
    },
    botao:{
        marginTop: 10,
        width: 150,
        height: 42,
        justifyContent: 'center'
    },
    textBotao:{

    }
})