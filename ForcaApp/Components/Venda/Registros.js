import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
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
import {DataContex} from '../../Context/dataContext.js'

const Registros = (props)=>{
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

  	const {setIdVenda,atualizaDataVenda, vrVenda} = React.useContext(DataContex);


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

	//const data  = allClientsMout;
	return(
		<>
			<Header 
				title={'Registros'} navigation={props.navigation} navegateTo={'HomeMenu'}
				
				back={true}
			/>
			<View
				style={[estilos.container]}
			>
				<View 
					style={{paddingRight: 0, paddingLeft:0,alignItems:'center', flexDirection:'row'}}
				>
					<TextInput
						style={[estilos.input, {textAlign:'center', borderColor:'#FFF'}]}
						onChangeText={(text)=>setItemLooked(text)}
						value={String(itemLooked)}
						placeholder="Nome ou Código"
                        onSubmitEditing={()=>setPesquisar(pesquisar + 1)}
					/>

					<TouchableOpacity
                    	   onPress={()=>setPesquisar(pesquisar + 1)}
                            style={
                                [
                                   {flexDirecion:'column'}
                               ]
                            }
                        >
                        <FontaWesome5
                             style={[{justifyContent:'center', alignItems:'center', color: '#FFF'}]}
                             name='arrow-circle-right' color="#FFF" size={40}
                        />    
                    </TouchableOpacity>
				</View>
				{pesquisar >= 0 &&
					<Pesquisar
						procurado={itemLook}
						setPesquisar={setPesquisar}
						setItemLooked={setItemLooked}
						setLoading={setLoading}
						pesquisar={pesquisar}
						setError={setError}
						setAallItemsMout={setAallItemsMout}
				 		setItem={setItem}
				 		setModalVisible={setModaAddProdlView}
				 		navigation={props.navigation}
				 		filters={{'status':'registro'}}
					/>
				 }

				 {
				 	<Relatorio
				 		data={allClientsMout}
				 		loading={loading}
				 		error={error}
				 		navigation={props.navigation}
				 	/>
				 }


				{modalVisible && 

					<ModalOpcoes
						modalVisible={modalVisible} setModalVisible={setModalVisible}
						data={dataMenu}
					/>
				}

				{modalAddProdView && 


					<ModalView
						modalVisible={modalAddProdView} setModalVisible={()=>configModalVisible()}
						modalTitle={titleModAdd}
					>
						
					</ModalView>
				}
			</View>
		</>
	)
}

export default Registros;