import React from 'react';
import {Picker,View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import {getConnection} from 'typeorm';
import Progresso from '../Utils/Progresso/index.js'
import {DataContex} from '../../Context/dataContext.js'
import {getVenda, findeOneVenda, findeLastVenda} from '../../Database/Dao/VendaDao.js'
import {findeOnePessoa} from '../../Database/Dao/PessoaDao.js'
import {getFilial} from '../../Database/Dao/FilialDao.js'

/*
	
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setEmbalagemItem(text)}
						value={embalagemItem}
						placeholder="Embalagem"
						autoFocus={false}		
					/>
*/
const FormInicioPdv = ({pessoa_id, id, setTitleMod,navigation, ...props})=>{
	const [dataItem, setDataItem] = React.useState()
	const [dataFilial, setDataFilial] = React.useState([])
	const [dataCliente, setDataCliente] = React.useState([])
	//const [cliente, setCliente] = React.useState('')
	const [idCliente, setIdCliente] = React.useState(1)
	const [nomeCliente, setNomeCliente] = React.useState('Fulano de tal')
	const [idClienteSearch, setIdClienteSearch] = React.useState(1)
	const [idPesssoaVendedor, setIdPesssoaVendedor] = React.useState(1)
	const [nrRcaVendedor, setNrRcaVendedor] = React.useState(1)
	const [enderecoEntrega, setEnderecoEntrega] = React.useState('')
	const [filial, setFilial] = React.useState(null)
	const [erroCliente, setErroCliente] = React.useState([])
	const [erroEntrega, setErroEntrega] = React.useState([])
	const [erroFilial, setErroFilial] 	= React.useState([])
	const [loading, setLoading] 		= React.useState(null)
	const [salvando, setSalvando] 		= React.useState(null)

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

	const {setIdVenda,atualizaDataVenda, setVrVenda} = React.useContext(DataContex);



	const findItem = async (id)=>{
		const connection = getConnection();

		const retorno = await connection.getRepository('Produto')
		.createQueryBuilder("produtos")
		.innerJoin("produtos.marca","marca","marca.id=produtos.marca_id")
		.select(['produtos.id','produtos.nome', 'produtos.marca_id', 'produtos.id_api', 'marca.nome'])
        .where("produtos.ativo = :ativo", {ativo: "yes" })
        .andWhere("marca.ativo = :ativo", {ativo: "yes" }) 
        .getOne();
		//.findOne({id:id, ativo:'yes'});
		return retorno;
	}


	const createVenda = React.useCallback(async ()=>{
		try{

			setSalvando(true)
			const connection = getConnection();

			const lastVend = await findeLastVenda();
			let idNext = 1;
			if(lastVend && lastVend.hasOwnProperty('id') && Number(lastVend.id) > 0 ){
				idNext = Number(lastVend.id) + 1;
			}
			
			let dataToSave={
				id:idNext,
				tp_doc:null,
				obs_interna:null,
				obs_nf:null,
				status:'registro',
				pessoa_vendedor_id:idPesssoaVendedor,
				ativo:'yes',
				usuario_id:1,
				id_api:null,
				nf_id:null,
				vr_bruto:0,
				vr_liquido:0,
				vr_desconto:0,
				tp_desconto:null,
				endereco_entrega_id:enderecoEntrega,
				pessoa_cancel_id:null,
				solicita_desconto:null,
				aprova_recusa_desconto:null,
				pessoa_libera_desconto_id:null,
				filial_id:filial,
				pessoa_id:idCliente,
				rca_vendedor:nrRcaVendedor,
				status_faturamento:'aberto',
				status_entrega:'pendente',
				dt_faturamento: null,
				dt_cancelamento: null,
				dt_cincronizacao: null
			}


			const retorno = await connection.getRepository('Vendas').save(dataToSave);
			console.log('---------------- criando nova venda ------------------------')
			console.log(retorno)
			console.log('---------------- criando nova venda ------------------------')
			if(retorno && retorno.hasOwnProperty('id') && Number(retorno.id) > 0){
				setIdVenda(retorno.id);
				atualizaDataVenda();
			}
			return retorno;
		}catch(e){
			console.log(e.message)
		}finally{
			setSalvando(false)
		}
	})

	const actionConcluir = async ()=>{
		let retorno = await createVenda();
		resetForm()
  		navigation.navigate("Pdv")
  		//navigation.navigate("Pdv")
  	}

  	const validaCliente = (val)=>{
  		let err=[]
  		if(! (val && val > 0)){
  			err.push("Obrigatório")
  		}

  		setErroCliente(err)
  	}

  	const validaFilial = (val)=>{
  		let err=[]
  		if(! (val && val > 0)){
  			err.push("Obrigatório")
  		}

  		setErroFilial(err)
  		
  	}

  	const validaEntrega = (val)=>{
  		let err=[]
  		if(! (val && val > 0)){
  			err.push("Obrigatório")
  		}

  		setErroEntrega(err)
  		
  	}

  	const configFilialForm = ()=>{
		let data_fili  = [];
		data_fili.push({ label: 'Selecione...', value: '0' })
		if(! (Array.isArray(dataFilial) && dataFilial.length > 0)){
			data_fili.push({ label: 'Matriz', value: '1' })
			data_fili.push({ label: 'Santa carina', value: '2' })
		}else{
			for(let propri in dataFilial){
				propri = dataFilial[propri]
				if(propri){
					data_fili.push({ label: propri?.nome, value: propri?.id })
				}
			}
		}

		return data_fili;
	}

	const configEntregaForm = ()=>{
		let data_fili  = [];
		data_fili.push({ label: 'Selecione...', value: '0' })
		if(! (Array.isArray(enderecoEntrega) && enderecoEntrega.length > 0)){
			data_fili.push({ label: 'Filial', value: '1' })
			data_fili.push({ label: 'Rua nova, MA', value: '2' })
			data_fili.push({ label: 'Rua da alegria, SC', value: '3' })
		}else{
			for(let propri in enderecoEntrega){
				propri = enderecoEntrega[propri]
				if(propri){
					data_fili.push({ label: propri?.nome, value: propri?.id })
				}
			}
		}

		return data_fili;
	}

	const resetForm = ()=>{
		setIdCliente(null)
		setNomeCliente(null)
		setEnderecoEntrega(null)
		setFilial(null)
	}



	React.useEffect(()=>{
		setLoading(true)
		const loadData = async ()=>{
			const data = await findItem(id);
			console.log('------------------ dados produto ---------------------')
			console.log(data)
			console.log('------------------ dados produto ---------------------')
			setDataItem(data)
			setTitleMod(data ?data.nome : 'Produto')
		}

		const loadDataCliente = async ()=>{
			
			const data_cliente = await findeOnePessoa({id:pessoa_id});
			const data_filial = await getFilial({});
			setDataCliente(data_cliente)
			setDataFilial(data_filial)
			
			setIdCliente(data_cliente?.id)
			setNomeCliente(data_cliente?.id+' - '+data_cliente?.nome)

			setLoading(false)//Tira o load
		}

		

		const desmontar = ()=>{
			return setLoading(null)//Tira o load
		}

		loadDataCliente()
		return desmontar()
	}, [id, pessoa_id])

	return(
		<ScrollView
			style={[
							{flex: 1, width: '100%', padding:20,paddingTop:50}
						]}
		>
			<KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={keyboardVerticalOffset} 
				style={[
							{flex: 1, width: '100%'}
						]}
			>
				<View
					style={[
							{flex: 1, width: '100%', margin:'auto', boxSizing:'border-box', borderRadius:4}
						]}
				>

					{(loading == true || loading == null) && <View style={{textAlign:'center'}} >
						{/*<Text>Carregando..</Text>*/}
						<Progresso color={'#FFF'} passo={false} type={false} indeterminate={true} />

					</View>}
					{loading === false && 
			
					(
						<>
						


							{/*<Text style={[{textAlign:'left', color:'#FFF', paddingLeft:22, fontWeight: 'bold'}]}>
													Pesquisar cliente
												</Text>
												<TextInput
													style={[estilos.input_form]}
													onChangeText={(text)=>setIdClienteSearch(text)}
													value={String(idClienteSearch)}
													placeholder="Nome ou CPF ou CNPJ "
													autoFocus={false}		
												/>*/}

							<Text style={[{textAlign:'left', color:'#FFF', paddingLeft:22, fontWeight: 'bold'}]}>
								Cliente
							</Text>
							<Text
								style={[estilos.input_form, {backgroundColor:'#DDD'}]}
							>
								{nomeCliente}	
							</Text>

							<Text style={[{textAlign:'left', color:'#FFF', paddingLeft:22,marginTop:10, fontWeight: 'bold'}]}>
								Filial
							</Text>
							<View style={[estilos.input_form]}>
							
								<Picker
					                    selectedValue={String(filial)}
					                    style={[estilos.input_form, {width:'100%',height:'100%', boxSizing:'border-box'}]}
					                    onValueChange={(val, index)=>setFilial(val)}
					                    mode={'dropdown'}
										onBlur={()=>validaFilial(filial)}
					            >

					                {
					                	configFilialForm().map((item, index, arr)=>{
					                		if(item && item.hasOwnProperty('label') && item.hasOwnProperty('value')){
					                			return(<Picker.Item key={`pk${index}${arr.length}${item.value}`} istemStyle={{width:'100%',height:'100%', boxSizing:'border-box'}} {...item} />)
					                		}
					                	})

					                }
				                </Picker>
			                </View>
							{/*<RNPickerSelect
													style={pickerSelectStyles}
										            onValueChange={(text)=>setFilial(text)}
										            items={[
										                { label: 'Matriz', value: '1' },
										                { label: 'Santa carina', value: '2' }
										            ]}
										            value={String(filial)}
										            placeholder={{
										              label: 'Selecione uma filial...',
										              value: null,
										              color: '#CCC',
										            }}
							
							            			useNativeAndroidPickerStyle={false}
										        />*/}

							<Text style={[{textAlign:'left', color:'#FFF', paddingLeft:22,marginTop:10, fontWeight: 'bold'}]}>
								Entrega
							</Text>
							<View style={[estilos.input_form]}>
							
								<Picker
					                    selectedValue={String(enderecoEntrega)}
					                    style={[estilos.input_form, {width:'100%',height:'100%', boxSizing:'border-box'}]}
					                    onValueChange={(val, index)=>setEnderecoEntrega(val)}
					                    mode={'dropdown'}
					                    onBlur={()=>validaEntrega(enderecoEntrega)}
					            >

					                {
					                	configEntregaForm().map((item, index, arr)=>{
					                		if(item && item.hasOwnProperty('label') && item.hasOwnProperty('value')){
					                			return(<Picker.Item key={`pk-entreg-${index}${arr.length}${item.value}`} istemStyle={{width:'100%',height:'100%', boxSizing:'border-box'}} {...item} />)
					                		}
					                	})

					                }
				                </Picker>
			                </View>
							{/*<RNPickerSelect
													style={pickerSelectStyles}
										            onValueChange={(text)=>setEnderecoEntrega(text)}
										            items={[
										                { label: 'Filial', value: '1' },
										                { label: 'Rua nova, MA', value: '2' },
										                { label: 'Rua da alegria, SC', value: '3' },
										            ]}
										            value={String(enderecoEntrega)}
										            placeholder={{
										              label: 'Selecione um endereço...',
										              value: null,
										              color: '#CCC',
										            }}
							
							            			useNativeAndroidPickerStyle={false}
										        />*/}
							
							{
								salvando === true 
								? 
									(
										<TouchableOpacity
											onPress={()=>null}
										>				
											<Text
												style={[estilos.input_form, {backgroundColor:'#CCC', borderColor:'#CCC',color:'#DDD',fontWeight: 'bold', marginTop:"10%"}]}
											>	
												Salvando...
											</Text>
										</TouchableOpacity>
									) 
								:
									(
										<TouchableOpacity
											onPress={()=>{actionConcluir();}}
										>				
											<Text
												style={[estilos.input_form, {backgroundColor:'#FFF', borderColor:'#FFF', color:'#008080',fontWeight: 'bold', marginTop:"10%"}]}
											>	
												Iniciar
											</Text>
										</TouchableOpacity>
									)
							}
							
						</>
					)
					}
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default FormInicioPdv;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius:50,
    //textAlign:'center',
    backgroundColor:'#FFF',
    borderColor:'#000',
    width:'90%',
    flexDirection:'column',
    textAlign:'center',
    alignSelf:'center',
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius:50,
    //textAlign:'center',
    backgroundColor:'#FFF',
    borderColor:'#000',
    width:'90%',
    flexDirection:'column',
    textAlign:'center',
    alignSelf:'center',
  },
});