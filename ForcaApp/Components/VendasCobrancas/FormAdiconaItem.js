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
import {getFormaPagamento, findeOneFormaPagamento, findeLastFormaPagamento} from '../../Database/Dao/FormaPagamentoDao.js'
import {getOperadorFinanceiro, findeOneOperadorFinanceiro, findeLastOperadorFinanceiro} from '../../Database/Dao/OperadorFinanceiroDao.js'
import {getPlanoPagamento, findeOnePlanoPagamento, findeLastPlanoPagamento} from '../../Database/Dao/PlanoPagamentoDao.js'
import {getVendaCobranca, findeOneVendaCobranca, findeLastVendaCobranca} from '../../Database/Dao/VendasCobrancasDao.js'
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
const FormAdiconaItem = ({id, setTitleMod,setModalVisible, setPesquisar, ...props})=>{
	const [dataCobrancasAdicionadas, setDataCobrancasAdicionadas] = React.useState([])
	const [dataCobrancas, setDataCobrancas] = React.useState([])
	const [dataFormaPgto, setDataFormaPgto] = React.useState([])
	const [dataPlanoPgto, setDataPlanoPgto] = React.useState([])
	const [dataOperaFinanceiro, setDataOperaFinanceiro] = React.useState([])
	const [vrTotCobAdd, setVrTotCobAdd] = React.useState(0)
	const [vrCobranca, setVrCobranca] = React.useState(0)
	const [idFormaPgto, setIdFormaPgto] = React.useState(0)
	const [idPlanoPgto, setIdPlanoPgto] = React.useState(0)
	const [idOpFinanceiro, setOpFinanceiro] = React.useState(0)
	const [salvando, setSalvando] = React.useState(0)
	const [loading, setLoading] = React.useState(false)
	const [erros, setErros] = React.useState([])

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

	const {setIdVenda,atualizaDataVenda, vrVenda, idVenda} = React.useContext(DataContex);



	

	React.useEffect(()=>{
		const loadData = async ()=>{
			try{

				//---- Carrega as formas de pagamento
				setLoading(true)
				await getCobrancasAdiconadas()
				await atualizaDataVenda();

				let paramFilter = {}
				const retornFormaPgto= await getFormaPagamento(paramFilter);
				if(retornFormaPgto){
					setDataFormaPgto(retornFormaPgto);
				}else{
					setDataFormaPgto([]);
				}

				//---- Carrega os operadores financeiros
				let paramPlanoFilter = {}
				const retornoPlano= awaitgetPlanoPagamento(paramPlanoFilter);

				if(retornoPlano){
					setDataPlanoPgto(retornoPlano);
				}else{
					setDataPlanoPgto([]);
				}

				
				await calculaTotalAdicionado();
				
			}catch(e){
				console.log(e.message)
			}finally{
				setLoading(false)
			}
		}

		loadData()
		
	}, [])

	const configFormaPgtoForm = ()=>{
		try{

			let data_item  = [];
			if(dataFormaPgto && Array.isArray(dataFormaPgto) && dataFormaPgto.length > 0){
				for(let item in dataFormaPgto){
					item = dataFormaPgto[item]
					if(item){
						data_item.push({ label: item.nome, value: item.id })
					}
				}
			}else{
				data_item.push({label:'DIN', value:'1'})
			}

			return data_item;

		}catch(e){
			console.log(e.message)
		}
	}

	const configPlanoPgtoForm = ()=>{
		try{
			let data_item  = [];
			if(dataPlanoPgto && Array.isArray(dataPlanoPgto) && dataPlanoPgto.length > 0){

				for(let item in dataPlanoPgto){
					item = dataPlanoPgto[item]
					if(item){
						data_item.push({ label: item.nome, value: item.id })
					}
				}

			}else{
				data_item.push({label:'À vista', value:'1'})
			}
			return data_item;
		}catch(e){
			console.log(e.message)
		}
	}

	const configOperadorFinanceiroForm = ()=>{
		try{

			
			let data_item  = [];
			if(dataOperaFinanceiro && Array.isArray(dataOperaFinanceiro) && dataOperaFinanceiro.length > 0){
				for(let item in dataOperaFinanceiro){
					item = dataOperaFinanceiro[item]
					if(item){
						data_item.push({ label: item.nome, value: item.id })
					}
				}
			}else{
				data_item.push({label:'Não obrigatório', value:'1'})
			}

			return data_item;
		}catch(e){
			console.log(e.message)
		}
	}

	const getCobrancasAdiconadas = async()=>{
		try{
			
			let paramFilter = {venda_id:idVenda}
			const retornoVendCobranca = await getVendaCobranca(paramFilter);

			console.log('----------- Cobranças --------------------------')
			console.log(retornoVendCobranca)
			console.log('----------- Cobranças --------------------------')

			if(retornoVendCobranca && Array.isArray(retornoVendCobranca) && retornoVendCobranca.length > 0){
				setDataCobrancasAdicionadas(retornoVendCobranca)
			}else{
				setDataCobrancasAdicionadas([])
			}
		}catch(e){
			console.log(e.message)
		}
	}

	const resetForm = ()=>{
		setVrCobranca(0);
		setIdFormaPgto(0);
		setIdPlanoPgto(0);
		setOpFinanceiro(0);
		setSalvando(0);
		setErros([]);
	}

	React.useEffect(()=>{

		calculaTotalAdicionado();	

	}, [dataCobrancasAdicionadas])

	const calculaTotalAdicionado = ()=>{
		if(dataCobrancasAdicionadas && Array.isArray(dataCobrancasAdicionadas) && dataCobrancasAdicionadas.length > 0){
			let totCob = 0;
			for(let i=0; !(i == dataCobrancasAdicionadas.length); i++){
				let atual = dataCobrancasAdicionadas[i]
				if(atual && atual.hasOwnProperty('vr_liquido') && atual.vr_liquido >= 0){
					totCob += Number(atual.vr_liquido)
				}
			}

			setVrTotCobAdd(totCob)

		}else{
			setVrTotCobAdd(0)
		}
		
		
		
	}

	const validarDesconto = ()=>{

		
		
	}

	const createVendaCobranca = React.useCallback(async ()=>{
		try{

			
			const connection = getConnection();
			//setSalvando(true)
			let idNext = 1;
			const lastPlano = await findeLastVendaCobranca();
			if(lastPlano && lastPlano.hasOwnProperty('id') && Number(lastPlano.id) > 0 ){
				idNext = Number(lastPlano.id) + 1;
			}

			let dataToSave ={						
				id:idNext,
				id_venda_cobranca_api:null,
				forma_pagamento_id:idFormaPgto,
				plano_pagamento_id:idPlanoPgto,
				operador_financeiro_id:null,
				venda_id:idVenda,
				vr_bruto:vrCobranca,
				vr_liquido:vrCobranca,
				vr_desconto:0,
				tp_desconto:null,
				usuario_id:1,
				status:null,
				dt_cincronizacao:null,
				ativo:'yes'
			}

			const retorno = await connection.getRepository('VendasCobrancas').save(dataToSave);
			return retorno;

			
		}catch(e){
			console.log(e.message)
		}finally{
			//setSalvando(false)
		}
	})

	const atualizaVenda = async ()=>{
		const connection = getConnection();

		
	}

	const adicionarCobranca = async ()=>{

		try{
			setSalvando(true)
			await createVendaCobranca()
			await getCobrancasAdiconadas()
			//await atualizaVenda();
			//await atualizaDataVenda();
		}catch(e){
			console.log(e.message)
		}finally{
			setSalvando(false)
		}
		
		setPesquisar()
		resetForm()
		setModalVisible();

	}

	

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
								Saldo R$
							</Text>
							<Text
								style={[estilos.input_form, {backgroundColor:'#DDD'}]}
								
							>
								{vrVenda ? formatMoney(Number(formataCalcCod(vrVenda))- vrTotCobAdd) : '0,00'}
							</Text>

							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Valor R$
							</Text>
							<TextInput
								style={[estilos.input_form, {marginBottom:20}]}
								onChangeText={(text)=>setVrCobranca(text)}
								value={String(vrCobranca)}
								placeholder="Quantidade"
								keyboardType={'decimal-pad'}
							/>

												
							<Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Forma de pgto
							</Text>
							<View style={[estilos.input_form,{marginBottom:20}]}>
							
								<Picker
					                    selectedValue={String(idFormaPgto)}
					                    style={[estilos.input_form, {width:'100%',height:'100%', boxSizing:'border-box'}]}
					                    onValueChange={(val, index)=>setIdFormaPgto(val)}
					                    mode={'dropdown'}
					                >
					                <Picker.Item label="Selecione..." value=""/>
					                {
					                	configFormaPgtoForm().map((item, index, arr)=>{
					                		if(item && item.hasOwnProperty('label') && item.hasOwnProperty('value')){
					                			return(<Picker.Item istemStyle={{width:'100%',height:'100%', boxSizing:'border-box'}} {...item} />)
					                		}
					                	})

					                }
				                </Picker>
			                </View>

			                <Text style={[{textAlign:'left', color:'#000', paddingLeft:22, fontWeight: 'bold'}]}>
								Plano de pgto
							</Text>
							<View style={[estilos.input_form]}>
							
								<Picker
					                    selectedValue={String(idPlanoPgto)}
					                    style={[estilos.input_form, {width:'100%',height:'100%', boxSizing:'border-box'}]}
					                    onValueChange={(val, index)=>setIdPlanoPgto(val)}
					                    mode={'dropdown'}
					                >
					                <Picker.Item label="Selecione..." value=""/>
					                {
					                	configPlanoPgtoForm().map((item, index, arr)=>{
					                		if(item && item.hasOwnProperty('label') && item.hasOwnProperty('value')){
					                			return(<Picker.Item istemStyle={{width:'100%',height:'100%', boxSizing:'border-box'}} {...item} />)
					                		}
					                	})

					                }
				                </Picker>
			                </View>

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
													style={[estilos.input_form, {backgroundColor:'#CCC', borderColor:'#CCC',color:'#DDD',fontWeight: 'bold', marginTop:50}]}
												>	
													Salvando...
												</Text>
											</TouchableOpacity>
											

										)
									:
										(
											
												
												

											<TouchableOpacity
												onPress={()=>adicionarCobranca()}
											>				
												<Text
													style={[estilos.input_form, {backgroundColor:'#000', color:'#FFF',fontWeight: 'bold', marginTop:50}]}
												>	
													Adicionar
												</Text>
											</TouchableOpacity>
											
										)
								}
								
							</View>
						</>
					)} 
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