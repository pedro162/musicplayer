import React from 'react';
import {View, Text, FlatList,Alert, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import Pesquisar from './Pesquisar.js'
import Relatorio from './Relatorio.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'
import {findeOnePessoa} from '../../Database/Dao/VendaDao.js'

const Ficha = ({pessoa_id ,...props})=>{
	const[cliente, setCliente] = React.useState(null); 
	const[allClients, setAllClients] = React.useState([]);
	const[allClientsMout, setAallClientsMout] = React.useState([]);
	const[clientLooked, setClientLooked] = React.useState('');
	const[clientLook, setClientLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const [modalVisible, setModalVisible] = React.useState(false);


	const loadData = React.useCallback(async ()=>{

		const connection = getConnection();
		const clienteData = await connection.getRepository('Cliente').findOne({id:'1'});
		setCliente(clienteData);
		
	})


	React.useEffect(()=>{

		
		
		//return retorno;

		const loadPessoaData = async ()=>{
			let paramFilter = {id:pessoa_id}
			const retornoPessoa = await findeOnePessoa(paramFilter);
			console.log('Pessoas -------------------')
			console.log(retornoPessoa)
			setAllClients(retornoPessoa)
			prepareDataClientToShow()
		}
		//loadPessoaData();
	}, [])
	

	const prepareDataClientToShow = ()=>{
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

								hasActionCol:true,
								actionCol:()=>{setCliente(atual.id);setModalVisible(true)},
								label:atual.id,
								props_col:{
									style:{maxWidth:'20%', minWidth:'20%',padding:10, flexDirecion:'column',backgroundColor:'',}																		
								},
							},
							{
								hasActionCol:true,
								actionCol:()=>{alert('aqui');setCliente(atual.id);setModalVisible(true)},
								label:atual.nome,
								props_col:{
									style:{maxWidth:'80%', minWidth:'80%', padding:10, flexDirecion:'column',backgroundColor:'',},
									
								},
								
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

	//const data  = allClientsMout;
	return(
		<>
			<Header 

				title={'Cliente - Ficha'} navigation={props.navigation} navegateTo={'Pedido'}
				
				back={true}
			/>
			<View
				style={[estilos.container, {paddingRight:20, paddingLeft:20, paddingTop:20}]}
			>
				<View style={{width:'100%',flexDirection:'row', justifyContent:"space-between"}}>
					<TouchableOpacity
                    	   onPress={()=>Alert.alert('Aqui...')}
                           style={{width:'100%',flexDirection:'row',height:50,justifyContent:"space-between"}}
                        >


						<Text style={[estilos.text_ficha]} >Informações pessoais</Text>
						<Text>
							<FontaWesome5 name='angle-right' color="#fff" size={26} />
						</Text>
                         
                    </TouchableOpacity>
				</View>

				<View style={{width:'100%',flexDirection:'row', justifyContent:"space-between"}}>
					<TouchableOpacity
                    	   onPress={()=>Alert.alert('Aqui...')}
                           style={{width:'100%',flexDirection:'row',height:50, justifyContent:"space-between"}}
                        >                        
						
						<Text style={[estilos.text_ficha]} >Enderço de cobrança</Text>
						<Text>
							<FontaWesome5 name='angle-right' color="#fff" size={26} />
						</Text>
                         
                    </TouchableOpacity>

				</View>

				<View style={{width:'100%',flexDirection:'row', justifyContent:"space-between"}}>
					<TouchableOpacity
                    	   onPress={()=>Alert.alert('Aqui...')}
                           style={{width:'100%',flexDirection:'row',height:50, justifyContent:"space-between"}}
                        >                        
						
						
						<Text style={[estilos.text_ficha]} >Outros enderços</Text>
						<Text>
							<FontaWesome5 name='angle-right' color="#fff" size={26} />
						</Text>
                         
                    </TouchableOpacity>

				</View>

				<View style={{width:'100%',flexDirection:'row', justifyContent:"space-between"}}>
					<TouchableOpacity
                    	   onPress={()=>Alert.alert('Aqui...')}
                           style={{width:'100%',flexDirection:'row',height:50, justifyContent:"space-between"}}
                        >                        
						
						
						
						<Text style={[estilos.text_ficha]} >Situação financeira</Text>
						<Text>
							<FontaWesome5 name='angle-right' color="#fff" size={26} />
						</Text>
                         
                    </TouchableOpacity>
				</View>

				<View style={{width:'100%',flexDirection:'row', justifyContent:"space-between"}}>
					<TouchableOpacity
                    	   onPress={()=>Alert.alert('Aqui...')}
                           style={{width:'100%',flexDirection:'row',height:50, justifyContent:"space-between"}}
                        >                        
						
						
						
						<Text style={[estilos.text_ficha]} >Observações</Text>
						<Text>
							<FontaWesome5 name='angle-right' color="#fff" size={26} />
						</Text>
                         
                    </TouchableOpacity>
				</View>
			</View>
		</>
	)
}

export default Ficha;