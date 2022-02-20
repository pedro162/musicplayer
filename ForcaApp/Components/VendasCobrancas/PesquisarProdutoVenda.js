import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import {getEmbProd, getProduto} from '../../Database/Dao/ProdDao.js'
import {getPessoa} from '../../Database/Dao/PessoaDao.js'
import {getEstoque} from '../../Database/Dao/EstoqueDao.js'
import {getMarca} from '../../Database/Dao/MacaDao.js'
import {getEmbalagem} from '../../Database/Dao/EmbagemDao.js'
import {getTabelaPreco, updateTabelaPreco} from '../../Database/Dao/TabelaPrecoDao.js'
import {getTabelaPrecoProduto} from '../../Database/Dao/TabelaPrecoProdutoDao.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'
import {getFilial, findeOneFilial} from '../../Database/Dao/FilialDao.js'
import {DataContex} from '../../Context/dataContext.js'
import {getFormaPagamento, findeOneFormaPagamento, findeLastFormaPagamento} from '../../Database/Dao/FormaPagamentoDao.js'
import {getOperadorFinanceiro, findeOneOperadorFinanceiro, findeLastOperadorFinanceiro} from '../../Database/Dao/OperadorFinanceiroDao.js'
import {getPlanoPagamento, findeOnePlanoPagamento, findeLastPlanoPagamento} from '../../Database/Dao/PlanoPagamentoDao.js'
import {getVendaCobranca, findeOneVendaCobranca, findeLastVendaCobranca} from '../../Database/Dao/VendasCobrancasDao.js'
import {formataCalcCod, formatMoney,calculaTotalAdicionado} from '../Utils/Funcoes/index.js'



const PesquisarProdutoVenda = ({idVendaSearch, searsh, setVrCobrancas,setDataVenda, setPesquisar, setItemLooked, data, setLoading, setError, setAallItemsMout,setItem, setModalVisible})=>{
	
	const {setIdVenda,atualizaDataVenda} = React.useContext(DataContex);

	const createFormaPagamento = React.useCallback(async ({id_forma_pagamento_api, nome, usuario_id, status, tipo, liberado, dt_criacao, dt_cincronizacao, ativo})=>{
		try{

			const connection = getConnection();

			let dataToSave ={						
				id_forma_pagamento_api,
				nome,
				usuario_id,
				status,
				tipo,
				liberado,
				dt_criacao,
				dt_cincronizacao,
				ativo,
			}

			const retorno = await connection.getRepository('FormaPagamento').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})
	/*
	*	
	*/
	const createOperadorFinanceiro = React.useCallback(async ({id,id_operador_financeiro_api, pessoa_id, usuario_id, status, dt_cincronizacao,	ativo, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={						
					id,
					id_operador_financeiro_api,
					pessoa_id,
					usuario_id,
					status,
					dt_cincronizacao,
					ativo,
			}

			const retorno = await connection.getRepository('OperadorFinanceiro').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createPlanoPagamento = React.useCallback(async ({id, id_plano_pagamento_api,nome, usuario_id, status, liberado, dt_criacao, dt_cincronizacao,	ativo,})=>{
		try{

			const connection = getConnection();

			let dataToSave ={						
					id,
					id_plano_pagamento_api,
					nome,
					usuario_id,
					status,
					liberado,
					dt_criacao,
					dt_cincronizacao,
					ativo,
			}

			const retorno = await connection.getRepository('PlanosPagamento').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createPrazoPagamento = React.useCallback(async ({quantidade,quantidade_orc, disponivel,avariado, bloqueado,reservado,filial_id,produto_id, ativo,usuario_id,id_api, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={						
					id_api,
					quantidade,
					quantidade_orc,
					disponivel,
					avariado,
					bloqueado,
					reservado,
					filial_id,
					produto_id,
					usuario_id,
					ativo,
			}

			const retorno = await connection.getRepository('Estoque').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})


	/*
		

	*/
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
									style:{maxWidth:'20%',color: '#000', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
							},
							{
								label:atual.nome_forma_pgto,
								props_col:{
									style:{maxWidth:'40%', color: '#000',minWidth:'40%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
							},
							{
								label:atual.nome_plano_pgto,
								props_col:{
									style:{maxWidth:'20%', color: '#000',minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
							},
							{
								label:formatMoney(Number(atual.vr_liquido)),
								props_col:{
									style:{maxWidth:'20%', color: '#000',minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
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
		

		const loadFormaPagamentoData = async ()=>{
			

			let dadosFormaPgto = {
				id_forma_pagamento_api:null,
				nome:'CD',
				usuario_id:1,
				status:null,
				tipo:5,////5:cartao, 4:boleto, 3:cheque, 2:credito_cliente, 1:dinheiro
				liberado:1,
				dt_criacao:null,
				dt_cincronizacao:null,
				ativo:'yes',
			}

			console.log('Formas de pgamento here -------------------')
			//const retorno = await createFormaPagamento(dadosFormaPgto);
			let paramFilter = {}
			const retornFormaPgto= await getFormaPagamento(paramFilter);
			
			console.log(retornFormaPgto)
			console.log('Formas de pgamento here -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadOperadorFinanceiroData = async ()=>{
			
			let idNext = 1;
			const lastOpera = await findeLastOperadorFinanceiro();
			if(lastOpera && lastOpera.hasOwnProperty('id') && Number(lastOpera.id) > 0 ){
				idNext = Number(lastOpera.id) + 1;
			}

			let dadosOperadorFinan = {
				id:idNext,
				id_operador_financeiro_api:null,
				pessoa_id:1,
				usuario_id:1,
				status:null,
				dt_cincronizacao:null,
				ativo:'yes',
			}

			console.log('Operadores Financeiros here -------------------')
			//const retorno = await createOperadorFinanceiro(dadosOperadorFinan);
			let paramFilter = {}
			const retornOperadorFinan= await getOperadorFinanceiro(paramFilter);
			
			console.log(retornOperadorFinan)
			console.log('Operadores Financeiros here -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}


		const loadPlanoPagamentoData = async ()=>{
			
			let idNext = 1;
			const lastPlano = await findeLastPlanoPagamento();
			if(lastPlano && lastPlano.hasOwnProperty('id') && Number(lastPlano.id) > 0 ){
				idNext = Number(lastPlano.id) + 1;
			}

			let dadosOperadorFinan = {
				id:idNext,
				id_plano_pagamento_api:null,
				nome:'2x 10-15 DIAS',
				usuario_id:1,
				status:null,
				liberado:1,//1-sim, 0-Não
				dt_criacao:null,
				dt_cincronizacao:null,
				ativo:'yes',
			}

			console.log('Plano Pagamento here -------------------')

			//const retorno = await createPlanoPagamento(dadosOperadorFinan);
			let paramFilter = {}
			const retornOperadorFinan= await getPlanoPagamento(paramFilter);
			
			console.log(retornOperadorFinan)
			console.log('Plano Pagamento here -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		//loadFormaPagamentoData();
		//loadOperadorFinanceiroData();
		loadPlanoPagamentoData();
	}, [])


	React.useEffect(()=>{

		//setPesquisar(false)//
		const loadProdPdvaData = async ()=>{
			try{
				setLoading(true)
				
				//---------------------
				let paramFilter = {venda_id:idVendaSearch}
				const retornoVendasProdutos = await getVendaProduto(paramFilter);

				let paramCobFilter = {venda_id:idVendaSearch}
				const retornoVendCobranca = await getVendaCobranca(paramCobFilter);
				console.log('---------------Cobranças---------------------')
				console.log(retornoVendCobranca)
				console.log('----------------Cobranças --------------------')
				
				let oneVenda = await findeOneVenda({id:idVendaSearch})
				

				if(oneVenda && oneVenda.hasOwnProperty('id') && Number(oneVenda.id) > 0){
					setDataVenda(oneVenda)
				}else{
					setDataVenda([])
				}
				//-------------
				if(retornoVendCobranca){
					prepareDataClientToShow(retornoVendCobranca)	
					let vrTot = calculaTotalAdicionado(retornoVendCobranca)
					setVrCobrancas(vrTot)
				}else{
					prepareDataClientToShow([])
					setVrCobrancas(0)
				}
				setLoading(false)
				//setItemLooked('')
			}catch(e){
				setError(e.message)
				setLoading(false)
				prepareDataClientToShow([])
			}
			//setPesquisar(0)
		}
		loadProdPdvaData();
		
	}, [idVendaSearch, searsh])

	//const data  = allClientsMout;
	return(
		<>
			
		</>
	)
}

export default PesquisarProdutoVenda;