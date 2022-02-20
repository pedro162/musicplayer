import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataContex} from '../../Context/dataContext.js'
import Progresso from '../Utils/Progresso/index.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'
import {formataCalcCod, formatMoney} from '../Utils/Funcoes/index.js'

const Relatorio = ({data, loading, error, navigation})=>{
	const [base, setBase] = React.useState([])


	const header = ()=>{
		try{
			const columns = [

				{
					label:"CD",
						props_col:{
						style:{maxWidth:'15%', minWidth:'15%',padding:10, flexDirecion:'column',backgroundColor:'',}
					}
				},
				{
					label:"Cli.",
					props_col:{
					style:{maxWidth:'50%', minWidth:'50%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"Sta.",
					props_col:{
					style:{maxWidth:'20%', minWidth:'20%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				},
				{
					label:"Tot.",
					props_col:{
					style:{maxWidth:'15%', minWidth:'15%', padding:10, flexDirecion:'column',backgroundColor:'',}

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
					let acoes_left_row 	=[{
						
					}]
					let acoes_right_row =[{
						label:'Edit.',
						action:()=>Alert.alert('Aqui pow..'),
						propsLabel:{style:{'height':'100%','width':'100%',backgroundColor: 'red',justifyContent:'center',}}
					}]

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
								actionCol:()=>{setItem(atual.id);setModalVisible(true)},
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'50%', color: '#000',minWidth:'50%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.id);setModalVisible(true)},
							},
							{
								label:formatMoney(atual.vr_liquido),
								props_col:{
									style:{maxWidth:'30%', color: '#000',minWidth:'30%', padding:10, flexDirecion:'column',backgroundColor:'',}

								},
								hasActionCol:true,
								actionCol:()=>{setItem(atual.id);setModalVisible(true)},
							}
						]

					})
				}
				
			}

			return data;
		}catch(e){
			console.log(e.message)
		}
	}


	const actionConcluir = async ()=>{
		//Alert.alert('Adicionar Cobranças')
		//let retorno = await createVenda();
		
  		navigation.navigate("VendasCobrancas")
  		//navigation.navigate("Pdv")
  	}

  	const actionCancelar = async ()=>{
		Alert.alert('Cancelar')
		//let retorno = await createVenda();
		
  		//navigation.navigate("VendasCobrancas")
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
			
				(
					<>
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
								<View style={{width:'100%',  maxHeight:'70%',   minHeight:'70%', flexDirection:'row'}} >
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
										style={{backgroundColor: '#008B8B', boderColor:'#DDD',boderWidth:2,paddingRight: 0, paddingLeft:0,flexDirecion:'row'}}
									/>
								</View>
							)
							:
							(
								<View style={{width:'100%',  maxHeight:'70%',   minHeight:'70%', flexDirection:'row', justifyContent:'center'}} >
									<Text style={{color:'#000', textAlign:'center', justifyContent:'center'}} >
										Nenhum resultado encontrado
									</Text>
								</View>
							)
						}
						
						<View style={{width:'100%', flexDirection:'row', marginTop:20, justifyContent:'flex-end', padding:10}} >
							
							<View style={{flexDirection:'column'}}>
								<TouchableOpacity
									onPress={()=>{navigation.navigate("PdvStart");}}
									style={{width:'100%'}}
								>				
									<Text
										style={[estilos.input_form, {backgroundColor:'#FFF', borderColor:'#FFF', color:'#008080',fontWeight: 'bold',width:'100%'}]}
									>	
										<FontaWesome5
				                             style={[{justifyContent:'center', alignItems:'center', color: '#008080'}]}
				                             name='plus' color="#FFF" size={20}
				                        /> 
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</>
				)
				
			
			}
			</View>
		</>
	)
}

export default Relatorio;