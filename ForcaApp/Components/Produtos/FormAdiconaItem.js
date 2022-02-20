import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';

/*
	
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setEmbalagemItem(text)}
						value={embalagemItem}
						placeholder="Embalagem"
						autoFocus={false}		
					/>
*/
const FormAdiconaItem = ({id, ...props})=>{
	const [dataItem, setDataItem] = React.useState()
	const [vrItem, setVrItem] = React.useState('')
	const [embalagemItem, setEmbalagemItem] = React.useState('')
	const [qtdItem, setQtdItem] = React.useState(1)
	const [vrDescontoItem, setVrDescontotem] = React.useState(0)

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
	return(
		<ScrollView
			style={[
							{flex: 1, width: '100%'}
						]}
		>
			<KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={keyboardVerticalOffset} 
				style={[
							{flex: 1, width: '100%'}
						]}
			>
				<View
					style={[
							{flex: 1, width: '100%', margin:'auto', boxSizing:'border-box'}
						]}
				>
					<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
						Embalagem
					</Text>
					<RNPickerSelect
						style={pickerSelectStyles}
			            onValueChange={(text)=>setEmbalagemItem(text)}
			            items={[
			                { label: 'Kg', value: '1' },
			                { label: 'UN', value: '2' },
			                { label: 'SC', value: '3' },
			            ]}
			            value={embalagemItem}
			            placeholder={{
			              label: 'Selecione uma embalagem...',
			              value: null,
			              color: '#CCC',
			            }}

            			useNativeAndroidPickerStyle={false}
			        />

					<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
						Preço R$
					</Text>
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setVrItem(text)}
						value={vrItem}
						placeholder="Preço R$ "
						autoFocus={false}					
						keyboardType={'decimal-pad'}
					/>

					<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
						Quantidade
					</Text>
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setQtdItem(text)}
						value={qtdItem}
						placeholder="Quantidade"
						autoFocus={true}	
						keyboardType={'decimal-pad'}
					/>

					<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
						Desconto R$ 
					</Text>
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setVrDescontotem(text)}
						value={vrDescontoItem}
						placeholder="Desconto R$ "
						autoFocus={false}	
						keyboardType={'decimal-pad'}
					/>

					<TouchableOpacity
						onPress={()=>Alert.alert("Adicionou")}
					>				
						<Text
							style={[estilos.input_form, {backgroundColor:'#000', color:'#FFF',fontWeight: 'bold', marginTop:50}]}
						>	
							Adicionar
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default FormAdiconaItem;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius:50,
    //textAlign:'center',
    backgroundColor:'#FFF',
    borderColor:'#000',
    width:'90%',
    flexDirection:'column',
    textAlign:'center',
    alignSelf:'center',
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius:50,
    //textAlign:'center',
    backgroundColor:'#FFF',
    borderColor:'#000',
    width:'90%',
    flexDirection:'column',
    textAlign:'center',
    alignSelf:'center',
  },
});