import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataContex} from '../../Context/dataContext.js'
import {formataCalcCod, formatMoney, calculaTotalAdicionado} from '../Utils/Funcoes/index.js'
import Progresso from '../Utils/Progresso/index.js'
import {getVendaCobranca, findeOneVendaCobranca, findeLastVendaCobranca} from '../../Database/Dao/VendasCobrancasDao.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'

const Relatorio = ({idPedido,data,dataVenda, loading, error, adicionarCobranca, navigation})=>{
	const [base, setBase] = React.useState([])
	const [vrCobrancas, setVrCobrancas] = React.useState(0)
	const [salvando, setSalvando] = React.useState(null)
	const [salvandoOrc, setSalvandoOrc] = React.useState(null)
	const {setIdVenda,setDataVenda,atualizaDataVenda, vrVenda, setVrVenda, idVenda} = React.useContext(DataContex);

	const getCobrancasAdiconadas = async()=>{
		try{
			
			let paramFilter = {venda_id:idPedido}
			const retornoVendCobranca = await getVendaCobranca(paramFilter);

			if(retornoVendCobranca && Array.isArray(retornoVendCobranca) && retornoVendCobranca.length > 0){
				let vrTot = calculaTotalAdicionado(retornoVendCobranca)
				setVrCobrancas(vrTot)
			}else{
				setVrCobrancas(0)
			}
		}catch(e){
			console.log(e.message)
		}
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
					label:"COB",
					props_col:{
					style:{maxWidth:'40%', minWidth:'40%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"F. pgto",
					props_col:{
					style:{maxWidth:'20%', minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"Tot.",
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
	
	const actionConcluir = async ()=>{
		try{

			setSalvando(true)
			let retorno = await atualizaVenda('prevenda');
			if(retorno == true){
				setIdVenda(null)//--- rezeta a venda do context
				setDataVenda([])//--- rezeta a venda do context
				setVrVenda('0,00')//--- rezeta a venda do context
				Alert.alert('Pedido finalizado com sucesso')
	  			navigation.navigate("ClienteMenu")
			}else{
				Alert.alert('Algo errado aconteceu. Tente novamente')
			}
		}catch(e){
			console.log(e.message)
		}finally{
			setSalvando(false)
		}
		
		
  		//navigation.navigate("Pdv")
  	}

  	const actionConcluirOrcamento = async ()=>{
		try{
			
			setSalvandoOrc(true)
			let retorno = await atualizaVenda('orcamento');
			if(retorno == true){
				setIdVenda(null)//--- rezeta a venda do context
				setDataVenda([])//--- rezeta a venda do context
				setVrVenda('0,00')//--- rezeta a venda do context
				Alert.alert('Pedido finalizado com sucesso')
	  			navigation.navigate("ClienteMenu")
			}else{
				Alert.alert('Algo errado aconteceu. Tente novamente')
			}
		}catch(e){
			console.log(e.message)
		}finally{
			setSalvandoOrc(false)
		}
		
		
  		//navigation.navigate("Pdv")
  	}

  	const atualizaVenda = async (tpVenda)=>{
		const connection = getConnection();

		const retornoVend 	= await findeOneVenda({id:idVenda});
		if(retornoVend && retornoVend.hasOwnProperty('status')){
			let status = retornoVend.status
			if(! (String(status).trim() == 'registro')){
				Alert.alert('Não é possível alterar um pedido já finalizado')
				return false;
			}
		}else{
			Alert.alert('Venda não identificada.')
			return false;
		}
		if(! tpVenda){	
			tpVenda= 'prevenda';
		}
		let data = {
			status:tpVenda,
		}
		const retorno = await connection.getRepository('Vendas').update(idVenda, {...data});
		console.log('------------------- Venda atualizada --------------------------')
		console.log(retorno)
		console.log('------------------- Venda atualizada --------------------------')
		return true;
		//findeOneVenda
	}

	React.useEffect(()=>{

		setBase(data);
		getCobrancasAdiconadas()
		
	}, [data, setBase, vrCobrancas])

	//const data  = allClientsMout;
	return(
		<>
			<View
				style={[estilos.container]}
			>
			{error && <Text>{error}</Text>}
			{loading == true && <View style={{textAlign:'center'}} >
				{/*<Text>Carregando..</Text>*/}
				<Progresso color={'#FFF'} passo={false} type={false} indeterminate={true} />

			</View>}


			{loading == false && 
			
				(
					<>
						

						<View style={{width:'100%', flexDirection:'row',textAlign:'right', marginTop:0, justifyContent:'flex-end', paddingRight:10}} >
							
							<View style={{flexDirection:'column'}}>
								<TouchableOpacity
									onPress={()=>{adicionarCobranca();}}
									style={{width:'100%'}}
								>				
									<Text
										style={[estilos.input_form, {backgroundColor:'#FFF',borderColor:'#FFF', color:'#008080',fontWeight: 'bold',width:'100%'}]}
									>	
										<FontaWesome5 name='plus' color="#008080" size={16} />
									</Text>
								</TouchableOpacity>
							</View>
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
						{

							Array.isArray(base) && base.length > 0 ? 
							(
								<View style={{width:'100%',  maxHeight:'50%',   minHeight:'50%', flexDirection:'row'}} >
									<FlatList
										data={base}
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
							)
							:
							(
								<View style={{width:'100%',  maxHeight:'50%',   minHeight:'50%', flexDirection:'row', justifyContent:'center'}} >
									<Text style={{color:'#000', textAlign:'center', justifyContent:'center'}} >
										Nenhum resultado encontrado
									</Text>
								</View>
							)
						}
						
						<View style={{width:'100%', flexDirection:'row', marginTop:20, justifyContent:'space-between', padding:10}} >
							{salvandoOrc  == true && (
								<View style={{flexDirection:'column'}}>
										<TouchableOpacity
											onPress={()=>null}
											style={{width:'100%'}}
										>				
											<Text
												style={[estilos.input_form, {backgroundColor:'#CCC', color:'#FFF',borderColor:'#CCC',fontWeight: 'bold',width:'100%'}]}
											>	
												Salvando...
											</Text>
										</TouchableOpacity>
									</View>

							)}

							{(salvandoOrc == false || salvandoOrc == null) && (
								<View style={{flexDirection:'column'}}>
										<TouchableOpacity
											onPress={()=>{actionConcluirOrcamento();}}
											style={{width:'100%'}}
										>				
											<Text
												style={[estilos.input_form, {backgroundColor:'#BDB76B', color:'#FFF',borderColor:'#BDB76B',fontWeight: 'bold',width:'100%'}]}
												
											>	
												Gerar orçamento
											</Text>
										</TouchableOpacity>
								</View>

							)}

							{salvando == true && (
								<View style={{flexDirection:'column'}}>
									<TouchableOpacity
										onPress={()=>null}
										style={{width:'100%'}}
									>				
										<Text
											style={[estilos.input_form, {backgroundColor:'#CCC', borderColor:'#CCC',color:'#DDD',fontWeight: 'bold',width:'100%'}]}
										>	
											Salvando...
										</Text>
									</TouchableOpacity>
								</View>
							)}

							{(salvando == false || salvando == null) && (
								<View style={{flexDirection:'column'}}>
									<TouchableOpacity
										onPress={()=>{actionConcluir();}}
										style={{width:'100%'}}
									>				
										<Text
											style={[estilos.input_form, {backgroundColor:'#FFF', color:'#008080',borderColor:'#FFF',fontWeight: 'bold',width:'100%'}]}
											
										>	
											Finalizar pedido
										</Text>
									</TouchableOpacity>
								</View>
							)}
							
						</View>
					</>
				)
				
				
			
			}
			</View>
		</>
	)
}

export default Relatorio;