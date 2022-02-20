import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection, createQueryBuilder, QueryRunner} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const Pesquisar = ({procurado, setPesquisar, setFilialLooked, data, setLoading, setError, setAllFiliaisMout, setFilial, setModalVisible})=>{
	//const[cliente, setCliente] = React.useState(null); 

	/*const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		setLoading(true)
		const clienteData = await connection.getRepository('Cliente').findOne({id:'1'});
		setCliente(clienteData);
		
	})*/

	
	const getFilial = async ({nome})=>{
		const connection = getConnection();
		//await connection.query(
       // `ALTER TABLE "pessoas" ADD COLUMN "dt_nacimento" DATE DEFAULT NULL`
    //  )
		//ALTER TABLE "pessoas" ADD COLUMN IF NOT EXISTS "title" VARCHAR(255) DEFAULT NULL
		//await connection.runMigrations();

  		//await connection.synchronize()

		//const retorno = await connection.getRepository('Filial').find({...data,ativo:'yes'});
		

		 if(nome){
        	const retorno = await connection
			.getRepository("Filial")
			.createQueryBuilder("filiais")
			.innerJoin("filiais.pessoa","pess","pess.id=filiais.pessoa_id")
			.select(['filiais.id', 'filiais.pessoa_id', 'filiais.id_api', 'pess.nome'])
	        .where("filiais.ativo = :ativo", {ativo: "yes" })
	        .andWhere("pess.ativo = :ativo", {ativo: "yes" }) 
	        .andWhere("pess.nome LIKE :nome", {nome: `%${nome}%` })
	        //.getSql();
	        .orderBy('filiais.id', 'DESC')
	        .getMany()
	        //.getSql();

	        console.log('----------------- tesre')
	        console.log(retorno)
	        //console.log('sql: '+retorno)
			return retorno;
        }else{

        	const retorno = await connection
			.getRepository("Filial")
			.createQueryBuilder("filiais")
			.innerJoin("filiais.pessoa","pess","pess.id=filiais.pessoa_id")
			.select(['filiais.id', 'filiais.pessoa_id', 'filiais.id_api', 'pess.nome'])
	        .where("filiais.ativo = :ativo", {ativo: "yes" })
	        .andWhere("pess.ativo = :ativo", {ativo: "yes" })	       
	        .orderBy('filiais.id', 'DESC')
	        //.getSql();
	        .getMany()
	        //.getSql();

	        console.log('----------------- tesre')
	        console.log(retorno)
	        //console.log('sql: '+retorno)
			return retorno;
        }


        //.select('filiais.id', 'pessoa.nome')
	}




	const prepareDataFilialToShow = (allClients)=>{
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
								actionCol:()=>{setFilial(atual.id);setModalVisible(true)},
							},
							{
								label:atual.pessoa.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setFilial(atual.id);setModalVisible(true)},
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

	React.useEffect(()=>{

		//setPesquisar(false)
		const loadFilialData = async ()=>{
			try{
				setLoading(true)
				let paramFilter = {}
				if(procurado && procurado.trim().length > 0){
					paramFilter.nome=procurado
				}
				
				const retornoPessoa = await getFilial(paramFilter);
				console.log('Dados da filial -------------------'+(Math.random(100) +1))
				console.log(retornoPessoa)
				
				prepareDataFilialToShow(retornoPessoa)	
				setLoading(false)
				//setFilialLooked('')
			}catch(e){
				setError(e.message)
				setLoading(false)
				prepareDataFilialToShow([])
			}
			//setPesquisar(0)
		}
		loadFilialData();
		
	}, [procurado])

	//const data  = allClientsMout;
	return(
		<>
			
		</>
	)
}

export default Pesquisar;