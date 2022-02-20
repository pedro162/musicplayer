import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
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
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto, findeLastVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'
import {formataCalcCod, formatMoney} from '../Utils/Funcoes/index.js'
import {DataContex} from '../../Context/dataContext.js'
import ResumoPedido from '../Pdv/ResumoPedido.js'//FormaPagamentoDao
import Progresso from '../Utils/Progresso/index.js'

const Ver = ({...props})=>{
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const[modalVisible, setModalVisible] = React.useState(false);  	
  	const [modalAddProdView, setModaAddProdlView] = React.useState(false);
  	const [dataVenda, setDataVenda]= React.useState([])
  	const [dataVendaFind, setIdVendaFind]= React.useState(null)
  	const [dataVendaProduto, setVendaProduto]= React.useState(null)
  	const [dataVendaProdutoFormat, setVendaProdutoFormat]= React.useState(null)

  	const {setIdVenda,atualizaDataVenda} = React.useContext(DataContex);

  	//const venda_id = props.pessoa//.getParam('venda_id', 1)
  	const parametros = props.route?.params
  	const venda_id = parametros.hasOwnProperty('venda_id') ? parametros.venda_id : null;
  	console.log('------------------------Navegação --------------------------------')
  	console.log(props.route)
  	console.log('-----------------Navegação --------------------------------')
  	const actionConcluir = ()=>{
  		props.navigation.navigate("Pdv")
  		//navigation.navigate("Pdv")
  	}

  	const validaInicioVenda = ()=>{

  	}

  	const header = ()=>{
		try{
			const columns = [

				{
					label:"CD",
						props_col:{
						style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
					}
				},
				{
					label:"Des",
					props_col:{
					style:{maxWidth:'40%', minWidth:'40%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"Qtd",
					props_col:{
					style:{maxWidth:'20%', minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"Tot. L",
					props_col:{
					style:{maxWidth:'20%', minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				}
			]
			
			return columns;
			
		}catch(e){
			console.log(e.message)
		}
	}

	const prepareDataClientToShow = (allClients)=>{
		try{
			let data = [];
			if(allClients && Array.isArray(allClients) && allClients.length > 0){
				
				for(let i=0; !(i == allClients.length); i++){
					let atual = allClients[i];

					let acoes_left_row 	=[]

					let acoes_right_row =[]

					data.push({
						id:atual.id,
						props_row:{
							
						},
						acoes_left_row,
						acoes_right_row,
						no_leftac_action:true,
						no_right_action:true,
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%',color: '#000', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								},
								hasActionCol:true,
								actionCol:()=>null,
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'40%', color: '#000',minWidth:'40%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>null,
							},
							{
								label:atual.qtd,
								props_col:{
									style:{maxWidth:'20%', color: '#000',minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>null,
							},
							{
								label:formatMoney(Number(atual.vr_liquido) * Number(atual.qtd)),
								props_col:{
									style:{maxWidth:'20%', color: '#000',minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>null,
							}
						]

					})
				}
				
			}

			return data
		}catch(e){
			console.log(e.message)
		}
	}


	React.useEffect(()=>{
		
		const loadData = async ()=>{
			try{

				setLoading(true)
				const venda = await findeOneVenda({id:venda_id});

				//---------------------
				let paramFilter = {venda_id:venda_id}
				const retornoVendasProdutos = await getVendaProduto(paramFilter);
				
				
				//-------------
				if(retornoVendasProdutos){
					setVendaProduto(retornoVendasProdutos)
					let retornoFormat = prepareDataClientToShow(retornoVendasProdutos)
					setVendaProdutoFormat(retornoFormat)

				}else{
					setVendaProduto([])
					let retornoFormat = prepareDataClientToShow([])
					setVendaProdutoFormat(retornoFormat)
				}


				if(venda){
					setDataVenda(venda)
				}else{
					setDataVenda([])
				}

			}catch(e){
				console.log(e.message)
			}finally{
				setLoading(false)
			}

		}
		loadData()

	}, [venda_id])
	


	//const data  = allClientsMout;//
	return(
		<>
			<Header 
				title={'Venda - Detalhes'} navigation={props.navigation} navegateTo={'HomeMenu'}
				back={true}
			/>
			<View
				style={[estilos.container]}
			>
				{loading == true && <View style={{textAlign:'center'}} >
					
					<Progresso color={'#FFF'} passo={false} type={false} indeterminate={true} />

				</View>}
				{loading == false && 
					(
						<>
							<View style={{width:'100%', flexDirection:'row', marginBottom:30,marginTop:20}}>
								<ResumoPedido
									idPedido={dataVenda && dataVenda.hasOwnProperty('id') ? dataVenda.id : ''}
									cliente={dataVenda && dataVenda.hasOwnProperty('pessoa') && dataVenda.pessoa.hasOwnProperty('nome')? dataVenda.pessoa.nome: ''}
									entrega={'Rua exemplo'}
									vr_venda={dataVenda && dataVenda.hasOwnProperty('vr_liquido') ? formatMoney(dataVenda.vr_liquido): '0,00'}
									vr_desconto={dataVenda && dataVenda.hasOwnProperty('vr_desconto') ? formatMoney(dataVenda.vr_desconto) : '0,00'}
									vr_cobrancas={String(formatMoney(dataVenda.vr_liquido))}
								/>
							</View>

							<View style={{width:'100%', flexDirection:'row', backgroundColor:'#008080', color:'#FFF'}} >
								{
									header().map((item, index, arr)=>{
									
										return(
											<View key={item.label+index+arr.length} {...item.props_col} >
												<Text style={{color:'#FFF',fontSize:12, fontWeight:'bold'}} >
													{item.label}
												</Text>
											</View>
										)
									})
								}
							</View>
							<View style={{width:'100%',  maxHeight:'50%',   minHeight:'50%', flexDirection:'row'}} >
								<FlatList
									data={dataVendaProdutoFormat}
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
									style={{backgroundColor: '#008B8B', boderColor:'#DDD', boderWidth:2,paddingRight: 0, paddingLeft:0,flexDirecion:'row'}}
								/>
							</View>
						</>
					)
				}
			</View>
		</>
	)
}

export default Ver;