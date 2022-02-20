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

const Cliente = (props)=>{
	const[cliente, setCliente] = React.useState(null); 
	const[allClients, setAllClients] = React.useState([]);
	const[allClientsMout, setAallClientsMout] = React.useState([]);
	const[clientLooked, setClientLooked] = React.useState('');
	const[clientLook, setClientLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const [modalVisible, setModalVisible] = React.useState(false);


	const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		const clienteData = await connection.getRepository('Cliente').findOne({id:'1'});
		setCliente(clienteData);
		
	})

	const createClient = async ()=>{

		const connection = getConnection();

		let dataToSave ={
			id_api:0,
			pessoa_id:1,
			filial_id:1,
			ativo:'yes',

		}

		const retorno = await connection.getRepository('Cliente').save(dataToSave);
		
	}

	const findCliente = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Cliente').findOne({id:id, ativo:'yes'});
		return retorno;
	}

	const createPessoa = React.useCallback(async ({nome, sobrenome, documento_complementar, documento, filial_id, status, ativo,usuario_id,id_api, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					nome,
					sobrenome,
					documento_complementar,
					documento,
					filial_id,
					status,
					ativo,
					usuario_id,
					id_api,
			}

			const retorno = await connection.getRepository('Pessoa').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const getPessoa = async (data)=>{
		try{
			const connection = getConnection();

			const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	}

	/*const findPessoa = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Pessoa').findOne({id:id, ativo:'yes'});
		return retorno;
	}*/

	const pesquisarCliente = async()=>{

		let paramFilter = {}
		if(clientLooked && clientLooked.length > 0){
			paramFilter.nome = clientLooked;
		}
		

		const retornoPessoa =  await getPessoa(paramFilter);
		console.log('Pessoas -------------------')
		console.log(retornoPessoa)
		await setAllClients(retornoPessoa)
		await prepareDataClientToShow()
	} 

	React.useEffect(()=>{

		
		
		//return retorno;

		const loadPessoaData = async ()=>{
			let dadosPessoa={
				nome:'Luciana',
				sobrenome:'Ramos saraiva',
				documento_complementar:null,
				documento:'61244536598',
				filial_id:1,
				status:null,
				ativo:'yes',
				usuario_id:1,
				id_api:0,
				dt_nascimento:'2020-01-01'
			}
			const retorno = await createPessoa(dadosPessoa);
			let paramFilter = {}
			const retornoPessoa = await getPessoa(paramFilter);
			console.log('Pessoas -------------------')
			console.log(retornoPessoa)
			setAllClients(retornoPessoa)
			prepareDataClientToShow()
		}
		//loadPessoaData();
	}, [])

	React.useEffect(()=>{
		if(pesquisar > 0){
			setClientLook(clientLooked)
		}else{
			setClientLook('')
		}
	}, [pesquisar])
	

	const prepareDataClientToShow = ()=>{
		try{
			let data = [];
			if(allClients && Array.isArray(allClients) && allClients.length > 0){
				
				for(let i=0; !(i == allClients.length); i++){
					let atual = allClients[i];

					data.push({
						id:atual.id,
						props_row:{
						},
						cols:[
							{

								hasActionCol:true,
								actionCol:()=>{setCliente(atual.id);setModalVisible(true)},
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}																		
								},
							},
							{
								hasActionCol:true,
								actionCol:()=>{alert('aqui');setCliente(atual.id);setModalVisible(true)},
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',},
									
								},
								
							}
						]

					})
				}
				
			}

			setAallClientsMout(data)
		}catch(e){
			console.log(e.message)
		}
	}

	const dataMenu=[
		{
			label:'Editar',
			propsLabel:{},
			actionLabel:()=>{props.navigation.navigate('HomeMenu')},
			propsActionLabel:{}
		},
		{
			label:'Excluir',
			propsLabel:{},
			actionLabel:()=>alert('Excluir cara: '+cliente),
			propsActionLabel:{}
		}
	]

	console.log('Pesquisa: '+clientLook)
	console.log('Pesquisa bool: '+pesquisar)

	//const data  = allClientsMout;
	return(
		<>
			<Header title={'Clientes'} navigation={props.navigation}/>
			<View
				style={[estilos.container]}
			>
				<View 
					style={{paddingRight: 0, paddingLeft:0,alignItems:'center', flexDirection:'row'}}
				>
					<TextInput
						style={[estilos.input, {textAlign:'center', borderColor:'#FFF'}]}
						onChangeText={(text)=>setClientLooked(text)}
						value={clientLooked}
						placeholder="Nome ou CPF ou CNPJ"
						autoFocus={true}
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
                             name='arrow-circle-right' color="#fff" size={40}
                        />    
                    </TouchableOpacity>
				</View>
				{pesquisar >= 0 &&
					<Pesquisar
						procurado={clientLook}
						pesquisar={pesquisar}
						setPesquisar={setPesquisar}
						setClientLooked={setClientLooked}
						setLoading={setLoading}
						setError={setError}
						setAallClientsMout={setAallClientsMout}
				 		setCliente={setCliente}
				 		setModalVisible={setModalVisible}
				 		navigation={props.navigation}
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

				{			/*	<FlatList
									data={allClientsMout}
									keyExtractor={(item)=>item.id.toString()}
									renderItem={({item})=>{
					                    //console.log(item.id)
					                    return(
					                    	 <Lista
					                            data={item}
					                    	/>
					                    )
					                }}
				
									ItemSeparatorComponent={()=><Separador/>}
									style={{backgroundColor: '#4F4F4F',boderColor:'#DDD',boderWidth:2,paddingRight: 0, paddingLeft:0,flexDirecion:'row'}}
								/>*/}

			{modalVisible && 

				<ModalOpcoes
					modalVisible={modalVisible} setModalVisible={setModalVisible}
					data={dataMenu}
				/>
			}
			</View>
		</>
	)
}

export default Cliente;