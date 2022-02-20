import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const Pesquisar = ({navigation, procurado, pesquisar, setPesquisar, setClientLooked, data, setLoading, setError, setAallClientsMout,setCliente, setModalVisible})=>{
	//const[cliente, setCliente] = React.useState(null); 

	/*const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		setLoading(true)
		const clienteData = await connection.getRepository('Cliente').findOne({id:'1'});
		setCliente(clienteData);
		
	})*/

	const createClient = async ()=>{

		const connection = getConnection();

		let dataToSave ={
			id_api:0,
			pessoa_id:1,
			filial_id:1,
			ativo:'yes',

		}
//
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

	const getPessoa = async ({nome})=>{
		const connection = getConnection();

		//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
		//return retorno;
		
        //.getSql();
        if(nome){
        	const retorno = await connection
			.getRepository("Pessoa")
			.createQueryBuilder("pessoa")
			.select(['pessoa.id', 'pessoa.nome', 'pessoa.id_api', 'pessoa.documento','pessoa.documento_complementar', 'pessoa.status'])
	        .where("pessoa.ativo = :ativo", {ativo: "yes" })
	        .andWhere("pessoa.nome LIKE :nome", {nome: `%${nome}%` })
	        .orderBy('pessoa.id', 'DESC')
	        .getMany()

	        console.log('----------------- tesre')
        	console.log(retorno)

	        return retorno;
        }else{
        	const retorno = await connection
			.getRepository("Pessoa")
			.createQueryBuilder("pessoa")
			.select(['pessoa.id', 'pessoa.nome', 'pessoa.id_api', 'pessoa.documento','pessoa.documento_complementar', 'pessoa.status'])
	        .where("pessoa.ativo = :ativo", {ativo: "yes" })
	        .orderBy('pessoa.id', 'DESC')
	        .getMany()
	        
	        console.log('----------------- tesre')
        	console.log(retorno)
	        return retorno;
        }

       
        //console.log('sql: '+retorno)
		
	}




	const prepareDataClientToShow = (allClients)=>{
		try{
			let data = [];
			if(allClients && Array.isArray(allClients) && allClients.length > 0){
				
				for(let i=0; !(i == allClients.length); i++){
					let atual = allClients[i];

					let acoes_left_row 	=[{
						
					}]
					let acoes_right_row =[
						{
							label:<View style={{flexDirecion:'column'}}><FontaWesome5 name='edit' color="#FFF" size={26} /><Text style={{fontSize:8, color:'#FFF'}}>Editar</Text></View>,
							action:()=>navigation.navigate("PdvStart",{'pessoa_id':atual.id}),
							propsLabel:{style:{ fontSize: 17, color: '#fff', paddingRight:10, paddingLeft:10,}},
							propsBoxLabel:{style:{backgroundColor: '#00BFFF', justifyContent:'center'}}
						},
						{
							label:<View style={{flexDirecion:'column'}}><FontaWesome5 name='file-alt' color="#FFF" size={26} /><Text style={{fontSize:8, color:'#FFF'}}>Ficha</Text></View>,
							action:()=>navigation.navigate("PdvMenu",{screen: 'Ficha',params:{'pessoa_id':atual.id}}),
							propsLabel:{style:{ fontSize: 17, color: '#fff', paddingRight:10, paddingLeft:10,}},
							propsBoxLabel:{style:{backgroundColor: '#7B68EE', justifyContent:'center'}}
						},
						{
							label:<View style={{flexDirecion:'column'}}><FontaWesome5 name='plus' color="#FFF" size={26} /><Text style={{fontSize:8, color:'#FFF'}}>Pedido</Text></View>,
							action:()=>navigation.navigate("PdvMenu",{screen: 'PdvStart',params:{'pessoa_id':atual.id}}),
							propsLabel:{style:{ fontSize: 17, color: '#fff', paddingRight:10, paddingLeft:10,}},
							propsBoxLabel:{style:{backgroundColor: '#BDB76B', justifyContent:'center'}}
						}
						
					]

					data.push({
						id:atual.id,
						props_row:{
							
						},
						acoes_left_row,
						acoes_right_row,
						no_leftac_action:true,
						no_right_action:false,
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								},
								hasActionCol:true,
								actionCol:()=>{setCliente(atual.id);setModalVisible(true)},
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setCliente(atual.id);setModalVisible(true)},
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

	React.useEffect(()=>{

		//setPesquisar(false)
		const loadPessoaData = async ()=>{
			try{
				setLoading(true)
				let paramFilter = {}
				if(procurado && procurado.trim().length > 0){
					paramFilter.nome=procurado
				}
				
				const retornoPessoa = await getPessoa(paramFilter);
				console.log('Dados -------------------'+(Math.random(100) +1))
				console.log(retornoPessoa)
				
				prepareDataClientToShow(retornoPessoa)	
				setLoading(false)
				//setClientLooked('')
			}catch(e){
				setError(e.message)
				setLoading(false)
				prepareDataClientToShow([])
			}
			//setPesquisar(0)
		}
		loadPessoaData();
		
	}, [procurado, pesquisar])

	//const data  = allClientsMout;
	return(
		<>
			
		</>
	)
}

export default Pesquisar;