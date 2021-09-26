import React from 'react';
import {View, Text, Image, TextInput, Button, Alert, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Toques = ({navigation}) =>{

    const home = ()=>{
        return navigation.navigate('Home');
    }

    const flatist = ()=>{
        return navigation.navigate('FlatListItem');
    }

    const mensagem = ()=>{
        return Alert.alert('Você clicou me min')
    }

    return(
        <View
            style={[{flex: 1, padding: 40}]}
        >
            <Text>Toques na tela</Text>
            <View
                style={{marginTop: 10, marginBottom: 10, flexDirection: 'column', alignItems: 'center', justifyContent:"space-between"}}
            >   
                <View
                    style={estilos.buttonContainer}
                >
                    <Button
                        onPress={()=>mensagem()}
                        title="Toque aqui"
                        style={{borderRadius: 50}}
                    />
                </View>
                <View
                    style={estilos.buttonContainer}
                >
                    <Button
                        onPress={()=>mensagem()}
                        title="Clique aqui também"
                        color='#841584'        
                    />
                </View>
                <View
                    style={estilos.buttonContainer}
                >
                    <Button
                        onPress={()=>mensagem()}
                        title="Outro aqui"
                        color="#000"
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={()=>home()}
            >
                <Text
                    style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50, marginBottom: 10}}
                >Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>flatist()}
            >
                <Text
                    style={{textAlign: 'center', backgroundColor: 'blue', color: '#fff', padding: 10, borderRadius: 50}}
                >FlatLit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Toques;

const estilos  = StyleSheet.create({
    cotainer:{
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer:{
        margin: 20
    },
    alternatiaveButtonContainer:{
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})