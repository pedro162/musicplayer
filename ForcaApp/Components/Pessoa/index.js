import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const Pessoa = (props)=>{
	const[cliente, setCliente] = React.useState(null); 
	const[allClients, setAllClients] = React.useState([]);

	const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		const clienteData = await connection.getRepository('Pessoa').findOne({id:'1'});
		setCliente(clienteData);
		
	})

	

	const createPessoa = React.useCallback(async ({nome, sobrenome, documento_complementar, documento, filial_id, status, ativo,usuario_id,id_api, })=>{

		const connection = getConnection();

		let dataToSave ={
			id_api:(id_api ? id_api : 0),
			nome,
			sobrenome,
			documento_complementar,
			documento,
			filial_id,
			status,
			ativo

		}

		const retorno = await connection.getRepository('Pessoa').save(dataToSave);
		return retorno;
	})

	const getPessoa = async (data)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Pessoa').find();//{ativo:'yes'}
		return retorno;
	}

	const findPessoa = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Pessoa').findOne({id:id, ativo:'yes'});
		return retorno;
	}


	const findPessoa = async (id, data)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Pessoa').update(id, {...data});
		return retorno;
	}

	const deletePessoa = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Pessoa').delete(id);
		return retorno;
	}



	React.useEffect(()=>{

		
		let dadosPessoa={
				nome:'José Pedro',
				sobrenome:'Aguiar Ferreira',
				documento_complementar:null,
				documento:'61244536598',
				filial_id:null,
				status:null,
				ativo:'yes',
				usuario_id:0,
				id_api:0
			}
		const retorno = null;//createPessoa(dadosPessoa);
		//return retorno;
		const loadPessoaData = async ()=>{
			const retornoPessoa = await getPessoa({nome:'Pedro'});
			console.log('Pessoas -------------------')
			console.log(retornoPessoa)
		}
		loadPessoaData();

	}, [])

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
			<Header title={'Pessoas'}/>
			<View
				style={[estilos.container]}
			>
				<View 
					style={{paddingRight: 0, paddingLeft:0,alignItems:'center', flexDirection:'row'}}
				>
					<TextInput
						style={[estilos.input]}
						onChangeText={()=>null}
						value=''
						placeholder="Nome ou CPF ou CNPJ"
					/>

					<TouchableOpacity
                    	   onPress={()=>alert('aqui')}
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

				<FlatList
					data={data}
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
				/>
			</View>
		</>
	)
}

export default Pessoa;