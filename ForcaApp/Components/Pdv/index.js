import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import Pesquisar from './Pesquisar.js'
import Relatorio from './Relatorio.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'
import ModalView from '../Utils/ModalView/index.js'
import FormAdiconaItem from './FormAdiconaItem.js'
import FormInicioPdv from './FormInicioPdv.js'
import {DataContex} from '../../Context/dataContext.js'

const PdvStart = ({...props})=>{
	const[item, setItem] = React.useState(null); 
	const[allItems, setAllItems] = React.useState([]);
	const[allClientsMout, setAallItemsMout] = React.useState([]);
	const[itemLooked, setItemLooked] = React.useState('');
	const[itemLook, setItemLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const[modalVisible, setModalVisible] = React.useState(false);  	
  	const [modalAddProdView, setModaAddProdlView] = React.useState(false);
  	const [titleModAdd, setTitleModAdd]= React.useState('Carregando...')

  	const {setIdVenda,atualizaDataVenda} = React.useContext(DataContex);

  	//const pessoa_id = props.pessoa//.getParam('pessoa_id', 1)
  	const parametros = props.route?.params
  	const pessoa_id = parametros.hasOwnProperty('pessoa_id') ? parametros.pessoa_id : null;
  	console.log('------------------------Navegação --------------------------------')
  	console.log(props.route)
  	console.log('-----------------Navegação --------------------------------')
  	const actionConcluir = ()=>{
  		props.navigation.navigate("Pdv")
  		//navigation.navigate("Pdv")
  	}

  	const validaInicioVenda = ()=>{

  	}


	React.useEffect(()=>{
		if(pesquisar > 0){
			setItemLook(itemLooked)
		}else{
			setItemLook('')
		}
	}, [pesquisar])
	


	const dataMenu=[
		{
			label:'Editar a',
			propsLabel:{},
			actionLabel:()=>{},//props.navigation.navigate('HomeMenu')
			propsActionLabel:{}
		},
		{
			label:'Excluir',
			propsLabel:{},
			actionLabel:()=>alert('Excluir cara: '+item),
			propsActionLabel:{}
		}
	]

	console.log('Pesquisa: '+itemLook)
	console.log('Pesquisa bool: '+pesquisar)

	//const data  = allClientsMout;//
	return(
		<>
			<Header 
				title={'Iniciar pedido'} navigation={props.navigation} navegateTo={'HomeMenu'}
				icon={

					<Text>
						<Text style={[{color: "#fff"}]} >R$ 0,00 </Text>
						<FontaWesome5 name='shopping-bag' color="#fff" size={26} />
					</Text>
				}
				back={true}
			/>
			<View
				style={[estilos.container]}
			>
				<FormInicioPdv
					id={null}
					pessoa_id={pessoa_id}
					setTitleMod={null}
					navigation={props.navigation}
				/>
			</View>
		</>
	)
}

export default PdvStart;