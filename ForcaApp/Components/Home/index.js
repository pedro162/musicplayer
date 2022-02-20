import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'
import ModalView from '../Utils/ModalView/index.js'
import FormAdiconaItem from '../Pdv/FormAdiconaItem.js'
import estilos from './estilos.js'

const Home = (props)=>{
	const[cliente, setCliente] = React.useState(null); 
  	const [modalVisible, setModalVisible] = React.useState(false);
  	const [modalView, setModalView] = React.useState(false);

	const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		const clienteData = await connection.getRepository('Cliente').findOne({id:'1'});
		setCliente(clienteData);
		
	})

	const dataMenu=[
		{
			label:'Editar',
			propsLabel:{},
			actionLabel:()=>alert('Editar cara'),
			propsActionLabel:{}
		},
		{
			label:'Excluir',
			propsLabel:{},
			actionLabel:()=>alert('Excluir cara'),
			propsActionLabel:{}
		}
	]
	return(
		<>
			<Header title={'Home'}/>
			<View>
			      <Pressable style={[estilos.button, estilos.buttonOpen]} onPress={()=>setModalView(true)}>
			        <Text style={estilos.textStyle}>Show Modal</Text>
			      </Pressable>
				<ModalOpcoes
					modalVisible={modalVisible} setModalVisible={setModalVisible}
					data={dataMenu}
				/>

				<ModalView
					modalVisible={modalView} setModalVisible={setModalView}
					modalTitle={'Vulcano 250 ml'}
				>
					<FormAdiconaItem
						id={10}
					/>
				</ModalView>
			</View>
		</>
	)
}

export default Home;