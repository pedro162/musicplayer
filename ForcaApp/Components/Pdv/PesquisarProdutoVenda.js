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
import {formataCalcCod, formatMoney} from '../Utils/Funcoes/index.js'



const PesquisarProdutoVenda = ({idVendaSearch, setDataVenda, setPesquisar, setItemLooked, data, setLoading, setError, setAallItemsMout,setItem, setModalVisible})=>{
	
	const {setIdVenda,atualizaDataVenda} = React.useContext(DataContex);

	const createClient = async ()=>{

		const connection = getConnection();//

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

	const createEmbalagem = React.useCallback(async ({nome, status, is_padrao, ativo,usuario_id,id_api, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					nome,
					usuario_id,
					status,
					ativo,
					is_padrao,
			}

			const retorno = await connection.getRepository('Embalagem').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createFilial = React.useCallback(async ({ status, ativo,usuario_id, pessoa_id, id_api, })=>{
		try{

			/*
				id_api
				pessoa_id
				usuario_id
				dt_cincronizacao
				ativo
			*/

			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					pessoa_id,
					usuario_id,
					status,
					ativo,
			}

			const retorno = await connection.getRepository('Filial').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createTabelaPreco = React.useCallback(async ({nome, status, is_referencia,table_refencia_id, ativo,usuario_id,id_api,estado_id })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					nome,
					usuario_id,
					status,
					ativo,
					is_referencia,
					table_refencia_id,
					estado_id,
			}

			const retorno = await connection.getRepository('TabelaDePreco').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})


	const createVenda = React.useCallback(async ({tp_doc, obs_interna, obs_nf, status, pessoa_vendedor_id, ativo,usuario_id,id_api,nf_id, vr_bruto, vr_liquido, vr_desconto, tp_desconto, endereco_entrega_id, pessoa_cancel_id, solicita_desconto, aprova_recusa_desconto, pessoa_libera_desconto_id, filial_id,pessoa_id, rca_vendedor, status_faturamento, status_entrega, dt_faturamento, dt_cancelamento, dt_cincronizacao })=>{
		try{

			
			const connection = getConnection();

			let dataToSave ={	
					tp_doc,
					obs_nf,
					obs_interna,
					id_api,
					usuario_id,
					status,
					ativo,
					pessoa_vendedor_id,
					filial_id,
					pessoa_id,
					rca_vendedor,
					nf_id,
					vr_bruto,
					vr_liquido,
					vr_desconto,
					tp_desconto,
					endereco_entrega_id,
					pessoa_cancel_id,
					solicita_desconto,
					aprova_recusa_desconto,
					pessoa_libera_desconto_id,
					status_faturamento,
					status_entrega,
					dt_faturamento,
					dt_cancelamento,
					dt_cincronizacao,
			}

			const retorno = await connection.getRepository('Vendas').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})


	const createVendaProduto = React.useCallback(async ({
			id_api,
			produto_id,
			venda_id,
			embalagem_id,
			qtd,
			qtd_devolvido,
			vr_bruto,
			vr_liquido,
			vr_desconto,
			tp_desconto,
			usuario_id,
			status,
			dt_cincronizacao,
			ativo,
		})=>{
		try{

			
			const connection = getConnection();

			let dataToSave ={	
					id_api,
					produto_id,
					venda_id,
					embalagem_id,
					qtd,
					qtd_devolvido,
					vr_bruto,
					vr_liquido,
					vr_desconto,
					tp_desconto,
					usuario_id,
					status,
					dt_cincronizacao,
					ativo,
			}

			const retorno = await connection.getRepository('VendasProdutos').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createTabelaPrecoProduto = React.useCallback(async ({nome, status, produto_id, tabela_preco_id, ativo,usuario_id,id_api,vr_preco, vr_preco_min,filial_id })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					id_api,
					nome,
					usuario_id,
					status,
					ativo,
					produto_id,
					tabela_preco_id,
					filial_id,
					vr_preco,
					vr_preco_min,
			}

			const retorno = await connection.getRepository('TabelaPrecoProduto').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})




	const createEmbProd = React.useCallback(async ({nome, produto_id, embalagem_id, vr_preco, vr_preco_min, tp_embalagem, status, is_padrao, ativo,usuario_id,id_api, })=>{
		try{

			const connection = getConnection();

			let dataToSave ={	
					
					nome,
					produto_id,
					embalagem_id,
					vr_preco,
					vr_preco_min,
					tp_embalagem,
					status,
					is_padrao,
					ativo,
					usuario_id,
					id_api
			}

			const retorno = await connection.getRepository('EmbalagemProduto').save(dataToSave);
			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const createEstoque = React.useCallback(async ({quantidade,quantidade_orc, disponivel,avariado, bloqueado,reservado,filial_id,produto_id, ativo,usuario_id,id_api, })=>{
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
								label:atual.nome,
								props_col:{
									style:{maxWidth:'40%', color: '#000',minWidth:'40%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
							},
							{
								label:atual.qtd,
								props_col:{
									style:{maxWidth:'20%', color: '#000',minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.produto_id);setModalVisible(true)},
							},
							{
								label:formatMoney(Number(atual.vr_liquido) * Number(atual.qtd)),
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
		//updateTabelaPreco()
		

		const loadMacaData = async ()=>{
			let dadosPessoa={
				nome:'Bravo',				
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

		const loadFilialData = async ()=>{

			/*
				,
					,
					usuario_id,
					status,
					ativo,
					
			*/
			let dadosPessoa={				
				status:null,
				ativo:'yes',
				pessoa_id:1,
				usuario_id:1,
				id_api:0,
			}
			const retorno = await createFilial(dadosPessoa);
			let paramFilter = {}
			const retornoPessoa = await getFilial(paramFilter);
			console.log('Filiais -------------------')
			console.log(retornoPessoa)
			console.log('Filiais -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadVendaProdutoData = async ({venda_id})=>{

			/*let dadosVendasProdutos={				
				status:null,
				tp_desconto:null,
				ativo:'yes',
				dt_cincronizacao:null,
				vr_bruto:18.59,
				vr_desconto:0.59,
				vr_liquido:18,
				qtd_devolvido:0,
				qtd:1,
				embalagem_id:1,
				usuario_id:1,
				venda_id:1,
				produto_id:1,
				id_api:0,
			}
			const retorno = await createVendaProduto(dadosVendasProdutos);*/
			let paramFilter = {venda_id:venda_id}
			const retornoVendasProdutos = await getVendaProduto(paramFilter);
			console.log('Vendas produtos -------------------')
			console.log(retornoVendasProdutos)
			console.log('Vendas produtos -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadTabelaPrecoData = async ()=>{
			/*nome, status, is_referencia,table_refencia_id, ativo,usuario_id,id_api
			*/
			let dadosTabelaPreco={
				nome:'Serrano',				
				status:null,
				ativo:'yes',
				is_referencia:'no',
				table_refencia_id:1,
				usuario_id:1,
				id_api:0,
				estado_id:1,
			}
			//const retorno = await createTabelaPreco(dadosTabelaPreco);
			let paramFilter = {}
			const retornoTabelaPreco = await getTabelaPreco(paramFilter);
			console.log('Tabelas de preço -------------------')
			console.log(retornoTabelaPreco)
			console.log('Tabelas de preço -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadTabelaPrecoProdData = async ()=>{
			/*
				id_api,
					nome,
					usuario_id,
					status,
					ativo,
					produto_id,
					tabela_preco_id,
					filial_id,
					vr_preco,
					vr_preco_min,
			*/
			let dadosTabelaPreco={
				nome:null,				
				status:null,
				ativo:'yes',
				usuario_id:1,
				id_api:0,
				produto_id:2,
				tabela_preco_id:1,
				filial_id:1,
				vr_preco:18.59,
				vr_preco_min:18,
			}
			//const retorno = await createTabelaPrecoProduto(dadosTabelaPreco);
			let paramFilter = {}
			const retornoTabelaPreco = await getTabelaPrecoProduto(paramFilter);
			console.log('Tabelas de preço produtos -------------------')
			console.log(retornoTabelaPreco)
			console.log('Tabelas de preço produtos -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadVendaData = async ()=>{
			/*
				tp_doc,
				 obs_interna,
				 obs_nf,
				 status,
				 pessoa_vendedor_id,
				 ativo,
				usuario_id,
				id_api,
				nf_id,
				 vr_bruto,
				 vr_liquido,
				 vr_desconto,
				 tp_desconto,
				 endereco_entrega_id,
				 pessoa_cancel_id,
				 solicita_desconto,
				 aprova_recusa_desconto,
				 pessoa_libera_desconto_id,
				 filial_id,
				pessoa_id,
				 rca_vendedor,
				 status_faturamento,
				 status_entrega,
				 dt_faturamento,
				 dt_cancelamento,
				 dt_cincronizacao
			*/
			let dadosVenda={
				tp_doc:null,
				obs_interna:null,
				obs_nf:null,
				status:'registro',
				pessoa_vendedor_id:1,
				ativo:'yes',
				usuario_id:1,
				id_api:null,
				nf_id:null,
				vr_bruto:0,
				vr_liquido:0,
				vr_desconto:0,
				tp_desconto:null,
				endereco_entrega_id:1,
				pessoa_cancel_id:null,
				solicita_desconto:null,
				aprova_recusa_desconto:null,
				pessoa_libera_desconto_id:null,
				filial_id:1,
				pessoa_id:1,
				rca_vendedor:12,
				status_faturamento:'aberto',
				status_entrega:'pendente',
				dt_faturamento: null,
				dt_cancelamento: null,
				dt_cincronizacao: null
			}
			//const retorno = await createVenda(dadosVenda);
			let paramFilter = {}
			const retornoVenda = await getVenda(paramFilter);

			let oneVenda = await findeOneVenda({id:1})
			if(oneVenda && oneVenda.hasOwnProperty('id') && Number(oneVenda.id) > 0){
				//await setIdVenda(oneVenda.id)
				//await atualizaDataVenda();
			}
			
			console.log('Vendas -------------------')
			console.log(retornoVenda)
			console.log('Vendas -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadEmbalagemData = async ()=>{
					
			let dadosEmbalagem={
				nome:'DUZ',				
				status:null,
				ativo:'yes',
				is_padrao:'no',
				usuario_id:1,
				id_api:0,
			}
			//const retorno = await createEmbalagem(dadosEmbalagem);
			let paramFilter = {}
			const retornoEmbalagem = await getEmbalagem(paramFilter);
			console.log('Embalagem -------------------')
			console.log(retornoEmbalagem)
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadEmbProdData = async ()=>{
										
			let dadosEmbProd={
				nome:null,				
				produto_id:2,				
				embalagem_id:2,				
				vr_preco:0.50,				
				vr_preco_min:0.50,				
				tp_embalagem:"venda",				
				status:null,
				ativo:'yes',
				is_padrao:'no',
				usuario_id:1,
				id_api:0,
			}
			
			//const retorno = await createEmbProd(dadosEmbProd);//
			let paramFilter = {tp_embalagem:'venda', produto_id:1}
			const retornoEmbProd = await getEmbProd(paramFilter);
			console.log('Embalagem Produto -------------------')
			console.log(retornoEmbProd)
			console.log('Embalagem Produto -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadProdutoData = async ()=>{
			let dadosProd={
				nome:'Apody',				
				status:null,
				ativo:'yes',
				usuario_id:1,
				filial_id:1,
				marca_id:2,
				id_api:0,
			}
			console.log('Produtos -------------------')
			//const retorno = await createProduto(dadosProd);
			let paramFilter = {}
			const retornoProd = await getProduto(paramFilter);
			
			console.log(retornoProd)
			console.log('Produtos -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		const loadEstoqueData = async ()=>{
			let dadosEstoque={
				quantidade:3000,
				disponivel:190,
				bloqueado:50,
				avariado:30,
				reservado:30,
				quantidade_orc:3000,
				ativo:'yes',
				usuario_id:1,
				produto_id:2,
				filial_id:1,
				id_api:0,
			}

			console.log('Eestoque here -------------------')
			//const retorno = await createEstoque(dadosEstoque);
			let paramFilter = {}
			const retornoProd = await getEstoque(paramFilter);
			
			console.log(retornoProd)
			console.log('Eestoque here -------------------')
			//setAllClients(retornoPessoa)
			//prepareDataClientToShow()
		}

		//updateTabelaPreco()
		//loadMacaData();
		//loadEmbalagemData()
		//loadEmbProdData()
		//loadProdutoData();
		//loadTabelaPrecoData()
		//loadTabelaPrecoProdData()
		//loadEstoqueData();
		//loadVendaData()
		//loadFilialData();
		//loadVendaProdutoData();
	}, [])


	React.useEffect(()=>{

		//setPesquisar(false)//
		const loadProdPdvaData = async ()=>{
			try{
				setLoading(true)
				
				//---------------------
				let paramFilter = {venda_id:idVendaSearch}
				const retornoVendasProdutos = await getVendaProduto(paramFilter);
				
				let oneVenda = await findeOneVenda({id:idVendaSearch})
				

				if(oneVenda && oneVenda.hasOwnProperty('id') && Number(oneVenda.id) > 0){
					setDataVenda(oneVenda)
				}else{
					setDataVenda([])
				}
				//-------------
				if(retornoVendasProdutos){
					prepareDataClientToShow(retornoVendasProdutos)	
				}else{
					prepareDataClientToShow([])
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
		
	}, [idVendaSearch])

	//const data  = allClientsMout;
	return(
		<>
			
		</>
	)
}

export default PesquisarProdutoVenda;