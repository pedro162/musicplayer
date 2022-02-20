import React from 'react';
import {Picker, View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import estilos from './estilos.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import {getConnection} from 'typeorm';
import {getEmbProd, findItem} from '../../Database/Dao/ProdDao.js'
import {getPessoa} from '../../Database/Dao/PessoaDao.js'
import {getEstoque, findeOneEstoqueProduto} from '../../Database/Dao/EstoqueDao.js'
import {getMarca} from '../../Database/Dao/MacaDao.js'
import {getEmbalagem} from '../../Database/Dao/EmbagemDao.js'
import {getTabelaPreco, updateTabelaPreco} from '../../Database/Dao/TabelaPrecoDao.js'
import {getTabelaPrecoProduto, findeOneTabelaPrecoProduto} from '../../Database/Dao/TabelaPrecoProdutoDao.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto, findeLastVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'
import {formataCalcCod, formatMoney} from '../Utils/Funcoes/index.js'
import {DataContex,DataStorange} from '../../Context/dataContext.js'
import Progresso from '../Utils/Progresso/index.js'

/*
	
					<TextInput
						style={[estilos.input_form]}
						onChangeText={(text)=>setEmbalagemItem(text)}
						value={embalagemItem}
						placeholder="Embalagem"
						autoFocus={false}		
					/>
*/
const FormAdiconaItem = ({id, setTitleMod,setModalVisible, ...props})=>{
	const [dataItem, setDataItem] = React.useState()
	const [dataEstoqueItem, setDataEstoqueItem] = React.useState({})
	const [qtdEstoqueItem, setQtdEstoqueItem] = React.useState(0)
	const [vrItem, setVrItem] = React.useState(0)
	const [vrMinimoItem, setMinimoVrItem] = React.useState(0)
	const [embalagemItem, setEmbalagemItem] = React.useState(null)
	const [embalagemData, setEmbalagemData] = React.useState(null)
	const [qtdItem, setQtdItem] = React.useState(0)
	const [vrDescontoItem, setVrDescontotem] = React.useState(0)
	const [vrTotalItem, setVrTotalItem] = React.useState(0)
	const [erros, setErros] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [salvando, setSalvando] = React.useState(null)

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

	const {setIdVenda,atualizaDataVenda, setVrVenda, idVenda} = React.useContext(DataContex);



	

	React.useEffect(()=>{
		const loadData = async ()=>{
			try{
				setLoading(true)

				const filial_id = 1;
				const estado_id = 1;
				const data = await findItem(id);
				setTitleMod(data ? `${data.id} - ${data.nome}` : 'Produto')
				setDataItem(data)
				if(! data){
					setErros([...erros, 'Produto não identificado'])
				}
				

				let paramFilter = {tp_embalagem:'venda', produto_id:id}
				const retornoEmbProd = await getEmbProd(paramFilter);
				setEmbalagemData(retornoEmbProd)

				if(! retornoEmbProd){
					setErros([...erros, 'Nenhuma embalagem contrada para esse produto'])
				}

				//--- carrega o estoque
				let paramEstoqueFilter = {produto_id:id, filial_id:filial_id}
				const retornoEstoqueProd = await findeOneEstoqueProduto(paramEstoqueFilter);
				setDataEstoqueItem(retornoEstoqueProd)
				if(! retornoEstoqueProd){
					setErros([...erros, 'Nenhum estoque encontrado para esse produto'])
				}
				setQtdEstoqueItem(retornoEstoqueProd ? retornoEstoqueProd.disponivel : 0)

				if((!retornoEstoqueProd.disponivel) || (retornoEstoqueProd.disponivel <= 0) ){
					setErros([...erros, 'Este produto não possuie estoque disponivel'])
				}

				//--- carrega a tabela de preço
				let paramTabelaPrecoFilialFilter = {produto_id:id, filial_id:filial_id, estado_id:estado_id}
				const retornoTabelaPrecoFilialProd = await findeOneTabelaPrecoProduto(paramTabelaPrecoFilialFilter);

				if(! retornoTabelaPrecoFilialProd){
					setErros([...erros, 'Nenhuma tabela de preço foi encontrada para esse produto'])
				}
				setVrItem(retornoTabelaPrecoFilialProd ? retornoTabelaPrecoFilialProd.vr_preco : 0)

				if((!retornoTabelaPrecoFilialProd.vr_preco) || (retornoEstoqueProd.vr_preco <= 0) ){
					setErros([...erros, 'Este produto não possuie preço configurado'])
				}

				setMinimoVrItem(retornoTabelaPrecoFilialProd ? retornoTabelaPrecoFilialProd.vr_preco_min : 0)

				console.log('------------------ Dados  aaa ---------------------')
				console.log(retornoTabelaPrecoFilialProd)
				console.log('------------------ Dados  ---------------------')//
				
			}catch(e){
				console.log(e.message)
			}finally{
				setLoading(false)
			}
		}

		loadData()
		
	}, [id])

	const configEmbForm = ()=>{
		let data_emb  = [];
		for(let embp in embalagemData){
			embp = embalagemData[embp]
			if(embp){
				data_emb.push({ label: embp.embalagem.nome, value: embp.embalagem_id })
			}
		}

		return data_emb;
	}

	const validarDesconto = ()=>{

		let vrDesc 	= Number(formataCalcCod(vrDescontoItem))
		let vrIt 	= Number(formataCalcCod(vrItem))
		let vrMinIt = Number(formataCalcCod(vrMinimoItem))
		vrDesc		=	(! isNaN(vrDesc)) 	? vrDesc 			: 0
		vrIt		=	(! isNaN(vrIt)) 	? vrIt 				: 0
		vrMinIt		=	(! isNaN(vrMinIt)) 	? vrMinIt 			: 0

		let qtdIt 	= qtdItem
		let escutaDesconto = true;
		if(vrMinIt &&  vrMinIt > 0){
			if((vrIt - vrDesc) >= vrMinIt){
				escutaDesconto = true
			}else{
				escutaDesconto = false
				setErros([...erros, `O desconto é inválido por conta do preço mínimo: ${formatMoney(vrMinIt)}`])
				Alert.alert(`O desconto é inválido por conta do preço mínimo: ${formatMoney(vrMinIt)}`)
			}

		}else{
			
			if((vrIt - vrDesc) > 0){
				escutaDesconto = true
			}else{
				escutaDesconto = false
				setErros([...erros, `O desconto ´e inválido por conta do preço final: ${formatMoney(vrIt - vrDesc)}`])
				Alert.alert(`O desconto ´e inválido por conta do preço final: ${formatMoney(vrIt - vrDesc)}`)
			}
		}


		console.log('Valor do Item: '+vrIt)
		console.log('Valor do minimo: '+vrMinIt)
		console.log('Valor do desconto: '+vrDesc)
		
		
		return escutaDesconto;
		
	}

	const createVendaProduto = React.useCallback(async ()=>{
		try{

			
			const connection = getConnection();

			let vrDesc 	= Number(formataCalcCod(vrDescontoItem))
			let vrIt 	= Number(formataCalcCod(vrItem))
			let vrMinIt = Number(formataCalcCod(vrMinimoItem))
			vrDesc		=	(! isNaN(vrDesc)) 	? vrDesc 			: 0
			vrIt		=	(! isNaN(vrIt)) 	? vrIt 				: 0
			vrMinIt		=	(! isNaN(vrMinIt)) 	? vrMinIt 			: 0

			const lastVendProd = await findeLastVendaProduto();
			let idNext = 1;
			if(lastVendProd && lastVendProd.hasOwnProperty('id') && Number(lastVendProd.id) > 0 ){
				idNext = Number(lastVendProd.id) + 1;
			}

			let dataToSave ={	
				id:idNext,
				status:null,
				tp_desconto:null,
				ativo:'yes',
				dt_cincronizacao:null,
				vr_bruto:vrIt,
				vr_desconto:vrDesc,
				vr_liquido:(vrIt - vrDesc),
				qtd_devolvido:0,
				qtd:qtdItem,
				embalagem_id:embalagemItem,
				usuario_id:1,
				venda_id:idVenda,
				produto_id:id,
				id_api:0,
			}

			const retorno = await connection.getRepository('VendasProdutos').save(dataToSave);
						
			console.log('------------------ Produto adicionado  ---------------------')
			console.log(retorno)
			console.log('------------------ Produto adicionado  ---------------------')//

			return retorno;
		}catch(e){
			console.log(e.message)
		}
	})

	const atualizaVenda = async ()=>{
		const connection = getConnection();

		const retornoVend 	= await findeOneVenda({id:idVenda});
		let vrBru 			= retornoVend && retornoVend.hasOwnProperty('vr_bruto') ? retornoVend.vr_bruto : 0;
		let vrDesc 			= retornoVend && retornoVend.hasOwnProperty('vr_desconto') ? retornoVend.vr_desconto : 0;
		let vrLiq 			= retornoVend && retornoVend.hasOwnProperty('vr_liquido') ? retornoVend.vr_liquido : 0;

		let vrDescontoIt 	= Number(formataCalcCod(vrDescontoItem))
		let vrIt 			= Number(formataCalcCod(vrItem))
		let vrMinIt 		= Number(formataCalcCod(vrMinimoItem))
		vrIt				=	(! isNaN(vrIt)) 	? vrIt 				: 0


		let totDesc = Number(vrDesc) + (vrDescontoIt * qtdItem)
		let vrTotBru = Number(vrBru) + (vrIt * qtdItem)

		let data = {
			vr_bruto:vrTotBru,
			vr_liquido:(vrTotBru - totDesc),
			vr_desconto:totDesc,
			tp_desconto:'item',
		}
		const retorno = await connection.getRepository('Vendas').update(idVenda, {...data});
		console.log('------------------ Atualizou  aaa ---------------------')
		console.log(idVenda)
		console.log('------------------ Atualizou  ---------------------')//
		//findeOneVenda
	}

	const adicionarProduto = async ()=>{
		try{
			setSalvando(true)
		
			await createVendaProduto()
			await atualizaVenda();
			await atualizaDataVenda();
		}catch(e){
			console.log(e.message)
		}finally{
			setSalvando(false)
		}
		setModalVisible();
	}

	React.useEffect(()=>{
		let vrIt = vrItem ? formataCalcCod(vrItem) : 0;

		let qtdIt = qtdItem ? qtdItem : 0; 
		let vrDescIt = vrDescontoItem ?  formataCalcCod(vrDescontoItem) : 0; 
		let vrTot = (vrIt * qtdIt) - vrDescIt;
		setVrTotalItem(vrTot)
		console.log('------------------ Erros  aaa ---------------------')
		console.log(erros)
		console.log('------------------ Erros  ---------------------')//

	}, [vrItem, qtdEstoqueItem, qtdItem, vrDescontoItem, setVrTotalItem])

	/*
		onChangeText={(text)=>setVrItem(text)}
						value={vrItem}
						placeholder="Preço R$ "
						autoFocus={false}					
						keyboardType={'decimal-pad'}
	*/
	

	return(
		<ScrollView
			style={[
							{flex: 1, width: '100%'}
						]}
		>
			<KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={keyboardVerticalOffset} 
				style={[
							{flex: 1, width: '100%'}
						]}
			>
				<View
					style={[
							{flex: 1, width: '100%', margin:'auto', boxSizing:'border-box'}
						]}
				>
					{loading == true && <View style={{textAlign:'center', height:'100%', justifyContent:'center', alignItems:'center'}} >
						{/*<Text>Carregando..</Text>*/}
						<Progresso color={'#008080'} passo={false} type={false} indeterminate={true} />

					</View>}

					
					{loading == false && (
						<>


							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Embalagem
							</Text>
							<View style={[estilos.input_form]}>
							
								<Picker
					                    selectedValue={String(embalagemItem)}
					                    style={[estilos.input_form, {width:'100%',height:'100%', boxSizing:'border-box'}]}
					                    onValueChange={(val, index)=>setEmbalagemItem(val)}
					                    mode={'dropdown'}
					                >
					                <Picker.Item label="Selecione..." value=""/>
					                {
					                	configEmbForm().map((item, index, arr)=>{
					                		if(item && item.hasOwnProperty('label') && item.hasOwnProperty('value')){
					                			return(<Picker.Item istemStyle={{width:'100%',height:'100%', boxSizing:'border-box'}} {...item} />)
					                		}
					                	})

					                }
				                </Picker>
			                </View>
							{/*<RNPickerSelect
													style={pickerSelectStyles}
										            onValueChange={(text)=>setEmbalagemItem(text)}
										            items={configEmbForm()}
										            value={String(embalagemItem)}
										            placeholder={{
										              label: 'Selecione uma embalagem...',
										              value: null,
										              color: '#CCC',
										            }}
							
							            			useNativeAndroidPickerStyle={false}
										        />*/}

							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Preço R$
							</Text>
							<Text
								style={[estilos.input_form, {backgroundColor:'#DDD'}]}
								
							>
								{vrItem ? formatMoney(vrItem) : '0,00'}
							</Text>

							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Quantidade
							</Text>
							<TextInput
								style={[estilos.input_form]}
								onChangeText={(text)=>setQtdItem(text)}
								value={String(qtdItem)}
								placeholder="Quantidade"
								keyboardType={'decimal-pad'}
							/>

							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Desconto R$ 
							</Text>
							<TextInput
								style={[estilos.input_form]}
								onChangeText={(text)=>setVrDescontotem(text)}
								onBlur={()=>validarDesconto() }
								value={String(vrDescontoItem)}
								placeholder="Desconto R$ "
								keyboardType={'decimal-pad'}
							/>

							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Total R$ 
							</Text>
							<Text
								style={[estilos.input_form, {backgroundColor:'#DDD'}]}
								
							>
								{vrTotalItem ? formatMoney(vrTotalItem) : '0,00'}
							</Text>
							<View style={{width:'100%', flexDirection:'row', margin:'auto',paddingLeft:14,paddingRight:14,justifyContent:'space-between'}}>
							
								<TouchableOpacity
									onPress={()=>{setModalVisible();}}
								>				
									<Text
										style={[estilos.input_form, {backgroundColor:'red',borderColor:'red', color:'#FFF',fontWeight: 'bold', marginTop:50}]}
									>	
										Cancelar
									</Text>
								</TouchableOpacity>
								
								

								{
									salvando == true
									?
										(
											
											<TouchableOpacity
												onPress={()=>null}
											>				
												<Text
													style={[estilos.input_form, {backgroundColor:'#CCC', borderColor:'#CCC', color:'#DDD',fontWeight: 'bold', marginTop:50}]}
												>	
													Salvando...
												</Text>
											</TouchableOpacity>											

										)
									:
										(
											
											<TouchableOpacity
												onPress={()=>adicionarProduto()}
											>				
												<Text
													style={[estilos.input_form, {backgroundColor:'#008080', borderColor:'#008080', color:'#FFF',fontWeight: 'bold', marginTop:50}]}
												>	
													Adicionar
												</Text>
											</TouchableOpacity>
											
										)
								}
							</View>
						</>
						)
					} 
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default FormAdiconaItem;

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