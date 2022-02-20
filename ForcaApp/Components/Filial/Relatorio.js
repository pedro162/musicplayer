import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

const Relatorio = ({data, loading, error})=>{
	const [base, setBase] = React.useState([])


	const prepareDataClientToShow = ()=>{
		try{
			let dataCompy = [];
			if(data && Array.isArray(data) && data.length > 0){
				
				for(let i=0; !(i == data.length); i++){
					let atual = data[i];

					dataCompy.push({
						id:atual.id,
						props_row:{
							
						},
						cols:[
							{
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}
								}
							},
							{
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

								}
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
					label:"Nome",
					props_col:{
					style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',}

					}
				}
			]
			
			return columns;
			
		}catch(e){
			console.log(e.message)
		}
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
			{loading == true && <Text style={{color:'#FFF', textAlign:'center'}} >Carregando...</Text>}

			{loading == false && 
			(Array.isArray(base) && base.length > 0 ? 
				(
					<>
					<View style={{width:'100%', flexDirection:'row', backgroundColor:'#1C1C1C', color:'#FFF'}} >
						{
							header().map((item, index, arr)=>{
							
								return(
									<View key={item.label+index+arr.length} {...item.props_col} >
										<Text style={{color:'#FFF'}} >
											{item.label}
										</Text>
									</View>
								)
							})
						}
					</View>
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
						style={{backgroundColor: '#4F4F4F',boderColor:'#DDD',boderWidth:2,paddingRight: 0, paddingLeft:0,flexDirecion:'row'}}
					/>
					</>
				)
				:
				<Text style={{color:'#FFF', textAlign:'center'}} >
					Nenhum resultado encontrado
				</Text>
			)
			}
			</View>
		</>
	)
}

export default Relatorio;