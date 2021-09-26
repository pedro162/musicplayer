import React from 'react';
import { TouchableHighlight, View, Text, ProgressBarAndroid, Image, ActivityIndicator, StyleSheet, ImageBackground,ToastAndroid, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, Alert, Picker, StatusBar, Switch} from 'react-native';
import ActiveIndicatorExemplo from '../ActiveIndicatorExemplo/index.js'
import Slider from '@react-native-community/slider'
import ListItem from '../ListItem/index.js';
import Separator from '../Separator/index.js'

const Profile = ({navigation})=>{
    const [option, setOption] = React.useState(5);
    const [selected, setSelected] = React.useState('java')
    const [progress, setProgress] = React.useState(0.01)

    const [ligado, setLigado] = React.useState(false);

    const toastDuration = ()=>{
        ToastAndroid.show('Mensagem curta', ToastAndroid.SHORT)
    }

    const toastDurationDirection = ()=>{
        //ToastAndroid.showWithGravity('Mensagem com duraçao e posição', ToastAndroid.SHORT, ToastAndroid.TOP)
        ToastAndroid.showWithGravity('Mensagem com duraçao e posição', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }


    const toastDurationGravityOffset = ()=>{
        
        ToastAndroid.showWithGravityAndOffset("Mensagem com : Duração e offset", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50 )
    }

    const animatedLarge = {
        size:'large',
        color:'#00ff00'
    }

    const msgTarefa = (msg)=>{
        Alert.alert('Tarefa: '+msg+' concluida.')
    }

    const msgTarefaExcluida = (msg)=>{
        Alert.alert(msg)
    }

    const data = [
        {id:1, tarefa:'teste 01', concluir:msgTarefa, excluir:msgTarefaExcluida},
        {id:2, tarefa:'teste 02', concluir:msgTarefa, excluir:msgTarefaExcluida},
        {id:3, tarefa:'teste 03', concluir:msgTarefa, excluir:msgTarefaExcluida},
    ]

    return(
        <View
            style={[{flex: 1, justifyContent: 'center'}]}
        >
            <StatusBar
                barStyle="dark-content"
                hidden={true}
                backgroundColor="#00BCD4"
            />
            <Text style={{fontSize: 30}}>{ligado ?  'Ligado...' : 'Desligado...'}</Text>

            <TouchableHighlight
                onPress={()=>Alert.alert('clicou em min')}
                underlayColor='red'
                activeOpacity={0.1}
            >
                <Text>Cliqui aui porra</Text>
            </TouchableHighlight>

            <Switch
                value={ligado}
                onValueChange={(value)=>setLigado(value)}    
            />

            <TouchableOpacity
                onPress={()=>setLigado(!ligado)}
            >
                <Text style={{backgroundColor: 'red', borderRaius: 50, color: '#fff', fontWeight: 'bolder'}}>Liga / Desliga</Text>
            </TouchableOpacity>
            
            <View
                style={{margin: 0}}
            >
                <Text>Temperatura {option} °C</Text>
            </View>

            <Slider
                maximumValue={40}
                minimumValue={0}
                step={5}
                minimumTrackTintColor="red"
                maximumTrackTintColor="blue"
                value={option}   
                onValueChange={(val)=>setOption(val)}
            />

            <FlatList
                data={data}
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                    return <ListItem
                        data={item}
                    />
                }}

                ItemSeparatorComponent={()=><Separator/>}
            />

            <View style={[estilos.container]}>
                <Picker
                    selectedValue={selected}
                    style={[estilos.container]}
                    onValueChange={(val, index)=>setSelected(val)}
                >
                    <Picker.Item label="PHP" value="php"/>
                    <Picker.Item label="Java" value="java"/>
                    <Picker.Item label="JavaScript" value="js"/>
                </Picker>
            </View>

            <ProgressBarAndroid/>
            <ProgressBarAndroid styleAttr="Horizontal"/>
            <ProgressBarAndroid styleAttr="Horizontal" color="green" />
            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
            />

            <TouchableOpacity
                onPress={()=>setProgress(progress  < 1 ? (progress + 0.1) : (progress > 0 ? progress - 0.1 : progress))}
            >

                <Text
                    style={[{padding: 10, backgroundColor: 'blue', color: '#fff', width:'100%'}]}
                >Progredir barrar</Text>
            </TouchableOpacity>
        </View>
    )
}


export default Profile;

const estilos = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    input:{
        height: 100,
        backgroundColor: '#fff',
        fontSize: 42,
        width:'100%'
    },
    picker:{
        height: 20,
        width:150,
        transform:[{scaleX:2.0}, {scaleY:2.0}]
    }
})