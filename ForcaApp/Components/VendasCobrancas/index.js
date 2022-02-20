import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import PesquisarProdutoVenda from './PesquisarProdutoVenda.js'
import Relatorio from './RelatorioVendaProduto.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'
import ModalView from '../Utils/ModalView/index.js'
import FormAdiconaItem from './FormAdiconaItem.js'
import {DataContex} from '../../Context/dataContext.js'
import {getVenda, findeOneVenda} from '../../Database/Dao/VendaDao.js'
import {getVendaProduto, findeOneVendaProduto, findeLastVendaProduto} from '../../Database/Dao/VendaProdutoDao.js'
import {getVendaCobranca, findeOneVendaCobranca, findeLastVendaCobranca} from '../../Database/Dao/VendasCobrancasDao.js'
import {formataCalcCod, formatMoney, calculaTotalAdicionado} from '../Utils/Funcoes/index.js'
import ResumoPedido from '../Pdv/ResumoPedido.js'//FormaPagamentoDao

const VendasCobrancas = (props)=>{
	const[item, setItem] = React.useState(null); 
	const[allItems, setAllItems] = React.useState([]);
	const[dataVenda, setDataVenda] = React.useState([]);
	const[allClientsMout, setAallItemsMout] = React.useState([]);
	const[itemLooked, setItemLooked] = React.useState('');
	const[searsh, setSearsh] = React.useState(1);
	const[itemLook, setItemLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const[modalVisible, setModalVisible] = React.useState(false);  	
  	const [modalAddProdView, setModaAddProdlView] = React.useState(false);
  	const [titleModAdd, setTitleModAdd]= React.useState('Adiconar cobrança')
  	const [vrCobrancas, setVrCobrancas] = React.useState(0)

  	const {setIdVenda,atualizaDataVenda, vrVenda, idVenda} = React.useContext(DataContex);

  	const getCobrancasAdiconadas = async()=>{
		try{
			
			let paramFilter = {venda_id:idVenda}
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

	React.useEffect(()=>{
		atualizaDataVenda()
	}, [])

	React.useEffect(()=>{
		if(pesquisar > 0){
			setSearsh(pesquisar)
		}else{
			setSearsh(1)
		}
	}, [pesquisar])
	


	const dataMenu=[
		{
			label:'Editar a',
			propsLabel:{},
			actionLabel:()=>{},//props.navigation.navigate('HomeMenu')
			propsActionLabel:{}
		},
		{
			label:'Excluir',
			propsLabel:{},
			actionLabel:()=>alert('Excluir cara: '+item),
			propsActionLabel:{}
		}
	]

	const configModalVisible = ()=>{
		setModaAddProdlView()
		//setTitleModAdd('')
		setItem(null)
	}

	console.log('Pesquisa: '+itemLook)
	console.log('Pesquisa bool: '+pesquisar)

	//const data  = allClientsMout;//
	return(
		<>
			<Header 
				title={'PDV - Cobranças'} navigation={props.navigation} navegateTo={'Pedido'}
				icon={

					<Text>
						<Text style={[{color: "#FFF"}]} >R$ {vrVenda} </Text>
						<FontaWesome5 name='shopping-bag' color="#FFF" size={26} />
					</Text>
				}
				back={true}
			/>
			<View
				style={[estilos.container]}
			>
				<View style={{width:'100%', flexDirection:'row', marginBottom:30,marginTop:20}}>
					<ResumoPedido
						idPedido={idVenda}
						cliente={dataVenda && dataVenda.hasOwnProperty('pessoa') && dataVenda.pessoa.hasOwnProperty('nome')? dataVenda.pessoa.nome: ''}
						entrega={'Rua exemplo'}
						vr_venda={dataVenda && dataVenda.hasOwnProperty('vr_liquido') ? formatMoney(dataVenda.vr_liquido): '0,00'}
						vr_desconto={dataVenda && dataVenda.hasOwnProperty('vr_desconto') ? formatMoney(dataVenda.vr_desconto) : '0,00'}
						vr_cobrancas={String(formatMoney(vrCobrancas))}
					/>
					

				</View>
				
				{idVenda && idVenda >= 0 &&
					<PesquisarProdutoVenda
						idVendaSearch={idVenda}
						setPesquisar={setPesquisar}
						setItemLooked={setItemLooked}
						searsh={searsh}
						setLoading={setLoading}
						setError={setError}
						setAallItemsMout={setAallItemsMout}
				 		setItem={setItem}
				 		setModalVisible={setModaAddProdlView}
						setDataVenda={setDataVenda}
						setVrCobrancas={setVrCobrancas}
					/>
				 }

				 {
				 	<Relatorio
				 		data={allClientsMout}
				 		loading={loading}
				 		error={error}
				 		idPedido={idVenda}
				 		dataVenda={dataVenda}
				 		navigation={props.navigation}
				 		adicionarCobranca={()=>setModaAddProdlView(true)}
				 		setVrCobrancas={setVrCobrancas}
				 	/>
				 }

				{modalAddProdView && 


					<ModalView
						modalVisible={modalAddProdView} setModalVisible={()=>configModalVisible()}
						modalTitle={titleModAdd}
					>
						<FormAdiconaItem
							id={item}
							setTitleMod={setTitleModAdd}
							setModalVisible={()=>configModalVisible()}
							setPesquisar={()=>setPesquisar(pesquisar +1)}
							setVrCobrancas={setVrCobrancas}
						/>
					</ModalView>
				}
			</View>
		</>
	)
}

export default VendasCobrancas;