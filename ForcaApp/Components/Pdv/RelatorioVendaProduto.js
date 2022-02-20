import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataContex} from '../../Context/dataContext.js'
import {formataCalcCod, formatMoney} from '../Utils/Funcoes/index.js'
import Progresso from '../Utils/Progresso/index.js'
import ResumoPedido from './ResumoPedido.js'

const Relatorio = ({idPedido,data,dataVenda, loading, error, navigation})=>{
	const [base, setBase] = React.useState([])


	const prepareDataClientToShow = ()=>{

		

		try{
			let dataCompy = [];
			if(data && Array.isArray(data) && data.length > 0){
				
				for(let i=0; !(i == data.length); i++){
					let atual = data[i];
					console.log('-------------------- Venda Prod aaaa-------------------------')
					console.log(atual)
					console.log('-------------------- Venda Prod aaaa-------------------------')
					dataCompy.push({
						id:atual.id,
						props_row:{
							
						},
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								},
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'50%', minWidth:'50%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},								
							},
							{
								label:atual.qtd,
								props_col:{
									style:{maxWidth:'30%', minWidth:'30%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},								
							},
							{
								label:atual.vr_liquido,
								props_col:{
									style:{maxWidth:'30%', minWidth:'30%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},								
							}
						]

					})
				}
				
			}

			return dataCompy;
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

	const actionConcluir = async ()=>{
		//Alert.alert('Concluiu')
		//let retorno = await createVenda();
		
  		navigation.navigate("VendasCobrancas")
  		//navigation.navigate("Pdv")
  	}

	React.useEffect(()=>{

		setBase(data);

		
	}, [data, setBase])

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
			(Array.isArray(base) && base.length > 0 ? 
				(
					<>
						<View style={{width:'100%', flexDirection:'row', marginBottom:30,marginTop:20}}>
							<ResumoPedido
								idPedido={idPedido}
								cliente={dataVenda && dataVenda.hasOwnProperty('pessoa') && dataVenda.pessoa.hasOwnProperty('nome')? dataVenda.pessoa.nome: ''}
								entrega={'Rua exemplo'}
								vr_venda={dataVenda && dataVenda.hasOwnProperty('vr_liquido') ? formatMoney(dataVenda.vr_liquido): '0,00'}
								vr_desconto={dataVenda && dataVenda.hasOwnProperty('vr_desconto') ? formatMoney(dataVenda.vr_desconto) : '0,00'}
								vr_cobrancas={'0,00'}
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
						<View style={{width:'100%', flexDirection:'row', marginTop:20, justifyContent:'space-between', padding:10}} >
							<View style={{flexDirection:'column'}}>
								<TouchableOpacity
									onPress={()=>{actionConcluir();}}
									style={{width:'100%'}}
								>				
									<Text
										style={[estilos.input_form, {backgroundColor:'red', borderColor:'red', color:'#FFF',fontWeight: 'bold',width:'100%'}]}
									>	
										Cancelar
									</Text>
								</TouchableOpacity>
							</View>
							<View style={{flexDirection:'column'}}>
								<TouchableOpacity
									onPress={()=>{actionConcluir();}}
									style={{width:'100%'}}
								>				
									<Text
										style={[estilos.input_form, {backgroundColor:'#000', color:'#FFF',fontWeight: 'bold',width:'100%'}]}
									>	
										Concluir
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</>
				)
				:
				<Text style={{color:'#000', textAlign:'center'}} >
					Nenhum resultado encontrado
				</Text>
			)
			}
			</View>
		</>
	)
}

export default Relatorio;