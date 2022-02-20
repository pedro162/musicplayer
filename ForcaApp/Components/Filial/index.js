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

const Filial = (props)=>{
	const[filial, setFilial] = React.useState(null); 
	const[allFiliais, setAllFiliais] = React.useState([]);
	const[allFiliaisMout, setAllFiliaisMout] = React.useState([]);
	const[filialLooked, setFilialLooked] = React.useState('');
	const[filialLook, setFilialLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const [modalVisible, setModalVisible] = React.useState(false);

	const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		const filialData = await connection.getRepository('Filial').findOne({id:'1'});
		setFilial(filialData);
		
	})


	const findFilial = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Filial').findOne({id:id, ativo:'yes'});
		return retorno;
	}

	const createFilial = React.useCallback(async ({id_api, pessoa_id, usuario_id, ativo})=>{
		try{

			const connection = getConnection();

			let dataToSave ={
				id_api:(id_api ? id_api : 0),
				pessoa_id,
				usuario_id,
				ativo

			}

			const retorno = await connection.getRepository('Filial').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})
	const getFilial = async (data)=>{
		try{
			const connection = getConnection();

			const retorno = await connection.getRepository('Filial').find({...data,ativo:'yes'});
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	}

	/*const findPessoa = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Filial').findOne({id:id, ativo:'yes'});
		return retorno;
	}*/

	const pesquisarFilial = async()=>{

		let paramFilter = {}
		if(filialLooked && filialLooked.length > 0){
			paramFilter.nome = filialLooked;
		}
		

		const retornoFiliais =  await getFilial(paramFilter);
		console.log('Filiais -------------------')
		console.log(retornoFiliais)
		await setAllFiliais(retornoFiliais)
		await prepareDataClientToShow()
	} 

	React.useEffect(()=>{

		
		
		//return retorno;

		const loadPessoaData = async ()=>{
			/*let dadosPessoa={
				nome:'Gaby',
				sobrenome:'Aguiar Ferreira',
				documento_complementar:null,
				documento:'61244536598',
				filial_id:1,
				status:null,
				ativo:'yes',
				usuario_id:1,
				id_api:0
			}
			const retorno = await createFilial(dadosPessoa);*/

			const retorno = await createFilial({id_api:null, pessoa_id:1, usuario_id:1, ativo:'yes'})

			let paramFilter = {}
			const retornoFiliais = await getFilial(paramFilter);
			console.log('Filiais -------------------')
			console.log(retornoFiliais)
			setAllFiliais(retornoFiliais)
			prepareDataClientToShow()
		}
		//loadPessoaData();
	}, [])

	React.useEffect(()=>{
		if(pesquisar > 0){
			setFilialLook(filialLooked)
		}else{
			setFilialLook('')
		}
	}, [pesquisar])
	
	const prepareDataClientToShow = ()=>{
		try{
			let data = [];
			if(allFiliais && Array.isArray(allFiliais) && allFiliais.length > 0){
				
				for(let i=0; !(i == allFiliais.length); i++){
					let atual = allFiliais[i];

					data.push({
						id:atual.id,
						props_row:{
							
						},
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								}
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

								}
							}
						]

					})
				}
				
			}

			setAllFiliaisMout(data)
		}catch(e){
			console.log(e.message)
		}
	}


	console.log('Pesquisa: '+filialLook)
	console.log('Pesquisa bool: '+pesquisar)

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
			actionLabel:()=>alert('Excluir cara: '+filial),
			propsActionLabel:{}
		}
	]

	/*const data = [
		{
			id:1,
			props_row:{
				
			},
			cols:[
				{
					label:'1',
					props_col:{
						style:{flexGrow: 1,flexBasis:0, padding:10, flexDirecion:'column',backgroundColor:'',}
					}
				},
				{
					label:'José Pedro',
					props_col:{
						style:{flexGrow: 1,flexBasis:0, padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				}
			]

		}
	]*/

	let exemplos = [];
	for(let i=0; !(i == 300); i++){
		exemplos.push({
			id:(i+1),
			props_row:{
				
			},
			cols:[
				{
					label:(i+1),
					props_col:{
						style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
					}
				},
				{
					label:'Nome exmplo '+(i+1),
					props_col:{
						style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				}
			]

		})
	}
	const data  = exemplos;
	return(
		<>
			<Header title={'Filiais'}/>
			<View
				style={[estilos.container]}
			>
				<View 
					style={{paddingRight: 0, paddingLeft:0,alignItems:'center', flexDirection:'row'}}
				>
					<TextInput
						style={[estilos.input]}
						onChangeText={(text)=>setFilialLooked(text)}
						value={filialLooked}
						placeholder="Nome ou CNPJ"
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

				{filialLook.length >= 0 &&
					<Pesquisar
						procurado={filialLook}
						setPesquisar={setPesquisar}
						setFilialLooked={setFilialLooked}
						setLoading={setLoading}
						setError={setError}
						setAllFiliaisMout={setAllFiliaisMout}
						setFilial={setFilial}
				 		setModalVisible={setModalVisible}
					/>
				 }

				 {
				 	<Relatorio
				 		data={allFiliaisMout}
				 		loading={loading}
				 		error={error}
				 	/>
				 }

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

export default Filial;