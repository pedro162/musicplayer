import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const Pesquisar = ({procurado, setPesquisar, setItemLooked, data, setLoading, setError, setAallItemsMout,setItem, setModalVisible})=>{
	/*
		procurado={itemLook}
		setPesquisar={setPesquisar}
		setItemLooked={setItemLooked}
		setLoading={setLoading}
		setError={setError}
		setAallItemsMout={setAallItemsMout}
		setItem={setItem}
		setModalVisible={setModalVisible}
	*/

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
	const createProduto = React.useCallback(async ({nome, filial_id,marca_id, status, ativo,usuario_id,id_api, })=>{
		try{


			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					nome,
					filial_id,
					marca_id,
					usuario_id,
					status,
					ativo,
			}

			const retorno = await connection.getRepository('Produto').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createMarca = React.useCallback(async ({nome, status, ativo,usuario_id,id_api, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					nome,
					usuario_id,
					status,
					ativo,
			}

			const retorno = await connection.getRepository('Marca').save(dataToSave);
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

	const getMarca = async ({nome})=>{
		const connection = getConnection();

		//const retorno = await connection.getRepository('Pessoa').find({...data,ativo:'yes'});
		//return retorno;
		
        //.getSql();
        if(nome){
        	const retorno = await connection
			.getRepository("Marca")
			.createQueryBuilder("marca")
			.select(['marca.id', 'marca.nome', 'marca.id_api', 'marca.status'])
	        .where("marca.ativo = :ativo", {ativo: "yes" })
	        .andWhere("marca.nome LIKE :nome", {nome: `%${nome}%` })
	        .orderBy('marca.id', 'DESC')
	        .getMany()

	        console.log('----------------- marca')
        	console.log(retorno)

	        return retorno;
        }else{
        	const retorno = await connection
			.getRepository("Marca")
			.createQueryBuilder("marca")
			.select(['marca.id', 'marca.nome', 'marca.id_api','marca.status'])
	        .where("marca.ativo = :ativo", {ativo: "yes" })
	        .orderBy('marca.id', 'DESC')
	        .getMany()
	        
	        console.log('----------------- marca')
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

					data.push({
						id:atual.id,
						props_row:{
							
						},
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.id);setModalVisible(true)},
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.id);setModalVisible(true)},
							}
						]

					})
				}
				
			}

			setAallItemsMout(data)
		}catch(e){
			console.log(e.message)
		}
	}


	React.useEffect(()=>{

		

		const loadMacaData = async ()=>{
			let dadosPessoa={
				nome:'Marca teste',				
				status:null,
				ativo:'yes',
				usuario_id:1,
				id_api:0,
			}
			const retorno = await createMarca(dadosPessoa);
			let paramFilter = {}
			const retornoPessoa = await getMarca(paramFilter);
			console.log('Marcas -------------------')
			console.log(retornoPessoa)
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}
		loadMacaData();
	}, [])


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
				//setItemLooked('')
			}catch(e){
				setError(e.message)
				setLoading(false)
				prepareDataClientToShow([])
			}
			//setPesquisar(0)
		}
		loadPessoaData();
		
	}, [procurado])

	//const data  = allClientsMout;
	return(
		<>
			
		</>
	)
}

export default Pesquisar;