import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import PesquisarProdutoVenda from './PesquisarProdutoVenda.js'
import Relatorio from './RelatorioVendaProduto.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'
import ModalView from '../Utils/ModalView/index.js'
import FormAdiconaItem from './FormAdiconaItem.js'
import {DataContex} from '../../Context/dataContext.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto, findeLastVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'

const Pedido = (props)=>{
	const[item, setItem] = React.useState(null); 
	const[allItems, setAllItems] = React.useState([]);
	const[dataVenda, setDataVenda] = React.useState([]);
	const[allClientsMout, setAallItemsMout] = React.useState([]);
	const[itemLooked, setItemLooked] = React.useState('');
	const[itemLook, setItemLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const[modalVisible, setModalVisible] = React.useState(false);  	
  	const [modalAddProdView, setModaAddProdlView] = React.useState(false);
  	const [titleModAdd, setTitleModAdd]= React.useState('Carregando...')

  	const {setIdVenda,atualizaDataVenda, vrVenda, idVenda} = React.useContext(DataContex);


	React.useEffect(()=>{
		atualizaDataVenda()
	}, [])

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

	const configModalVisible = ()=>{
		setModaAddProdlView()
		setTitleModAdd('')
		setItem(null)
	}

	console.log('Pesquisa: '+itemLook)
	console.log('Pesquisa bool: '+pesquisar)

	//const data  = allClientsMout;//
	return(
		<>
			<Header 
				title={'PDV - Pedido'} navigation={props.navigation} navegateTo={'Pedido'}
				icon={

					<Text>
						<Text style={[{color: "#FFF"}]} >R$ {vrVenda} </Text>
						<FontaWesome5 name='shopping-bag' color="#FFF" size={26} />
					</Text>
				}
				back={true}
			/>
			<View
				style={[estilos.container]}
			>
				
				{idVenda && idVenda >= 0 &&
					<PesquisarProdutoVenda
						idVendaSearch={idVenda}
						setPesquisar={setPesquisar}
						setItemLooked={setItemLooked}
						setLoading={setLoading}
						setError={setError}
						setAallItemsMout={setAallItemsMout}
				 		setItem={setItem}
				 		setModalVisible={setModaAddProdlView}
						setDataVenda={setDataVenda}
					/>
				 }

				 {
				 	<Relatorio
				 		data={allClientsMout}
				 		loading={loading}
				 		error={error}
				 		idPedido={idVenda}
				 		dataVenda={dataVenda}
				 		navigation={props.navigation}
				 	/>
				 }

				{modalAddProdView && 


					<ModalView
						modalVisible={modalAddProdView} setModalVisible={()=>configModalVisible()}
						modalTitle={titleModAdd}
					>
						<FormAdiconaItem
							id={item}
							setTitleMod={setTitleModAdd}
							setModalVisible={()=>configModalVisible()}
						/>
					</ModalView>
				}
			</View>
		</>
	)
}

export default Pedido;