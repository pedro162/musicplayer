import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'
import Pesquisar from './Pesquisar.js'
import Relatorio from './Relatorio.js'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalOpcoes from '../Utils/ModalOpcoes/index.js'

const Pdv = (props)=>{
	const[item, setItem] = React.useState(null); 
	const[allItems, setAllItems] = React.useState([]);
	const[allClientsMout, setAallItemsMout] = React.useState([]);
	const[itemLooked, setItemLooked] = React.useState('');
	const[itemLook, setItemLook] = React.useState('');
	const[pesquisar, setPesquisar] = React.useState(1);
	const[loading, setLoading] = React.useState(false)
	const[error, setError] = React.useState(null)
  	const[modalVisible, setModalVisible] = React.useState(false);


	React.useEffect(()=>{
		if(pesquisar > 0){
			setItemLook(itemLooked)
		}else{
			setItemLook('')
		}
	}, [pesquisar])
	


	const dataMenu=[
		{
			label:'Editar',
			propsLabel:{},
			actionLabel:()=>{props.navigation.navigate('HomeMenu')},
			propsActionLabel:{}
		},
		{
			label:'Excluir',
			propsLabel:{},
			actionLabel:()=>alert('Excluir cara: '+item),
			propsActionLabel:{}
		}
	]

	console.log('Pesquisa: '+itemLook)
	console.log('Pesquisa bool: '+pesquisar)

	//const data  = allClientsMout;
	return(
		<>
			<Header 
				title={'PDV'} navigation={props.navigation} navegateTo={'HomeMenu'}
				icon={

					<Text>
						<Text style={[{color: "#fff"}]} >R$ 50 </Text>
						<FontaWesome5 name='shopping-bag' color="#fff" size={26} />
					</Text>
				}
			/>
			<View
				style={[estilos.container]}
			>
				<View 
					style={{paddingRight: 0, paddingLeft:0,alignItems:'center', flexDirection:'row'}}
				>
					<TextInput
						style={[estilos.input]}
						onChangeText={(text)=>setItemLooked(text)}
						value={itemLooked}
						placeholder="Nome ou Código"
						autoFocus={true}
                        onSubmitEditing={()=>setPesquisar(pesquisar + 1)}
					/>

					<TouchableOpacity
                    	   onPress={()=>setPesquisar(pesquisar + 1)}
                            style={
                                [
                                   {flexDirecion:'column'}
                               ]
                            }
                        >
                        <FontaWesome5
                             style={[{justifyContent:'center', alignItems:'center', color: '#FFF'}]}
                             name='arrow-circle-right' color="#fff" size={40}
                        />    
                    </TouchableOpacity>
				</View>
				{itemLook.length >= 0 &&
					<Pesquisar
						procurado={itemLook}
						setPesquisar={setPesquisar}
						setItemLooked={setItemLooked}
						setLoading={setLoading}
						setError={setError}
						setAallItemsMout={setAallItemsMout}
				 		setItem={setItem}
				 		setModalVisible={setModalVisible}
					/>
				 }

				 {
				 	<Relatorio
				 		data={allClientsMout}
				 		loading={loading}
				 		error={error}
				 	/>
				 }


			{modalVisible && 

				<ModalOpcoes
					modalVisible={modalVisible} setModalVisible={setModalVisible}
					data={dataMenu}
				/>
			}
			</View>
		</>
	)
}

export default Pdv;