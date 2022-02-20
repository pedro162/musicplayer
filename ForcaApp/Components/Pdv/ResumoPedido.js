
import React from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {getConnection} from 'typeorm';
import Header from '../Header/index.js'
import Separador from '../Utils/Separador/index.js'
import Lista from '../Utils/Lista/index.js'
import estilos from './estilos.js'

const ResumoPedido = ({idPedido,cliente,entrega,vr_venda,vr_desconto,vr_cobrancas, ...props})=>{
	
	return(
		<>
			<View style={{flexDirection:'column', width:'100%'}}>
				<View style={{flexDirection:'row', width:'100%',marginBottom:10,}}>

					<View style={{flexDirection:'column', width:'50%'}}>
						<View style={{flexDirection:'row',  marginBottom:10, paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Pedido: 
							</Text>

							<Text style={{textAlign:'left', color:'#FFF'}} >
								{idPedido}
							</Text>
						</View>
						
						<View style={{flexDirection:'row',  marginBottom:10, paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Cliente:
							</Text>

							<Text style={{textAlign:'left',color:'#FFF'}}>
								 {cliente? cliente: ''}
							</Text>
						</View>
						<View style={{flexDirection:'row',  paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Entrega: 
							</Text>

							<Text style={{textAlign:'left', color:'#FFF'}}>
								{entrega && entrega.length > 0 ? entrega : ''}
							</Text>
						</View>
						
					</View>
					<View style={{flexDirection:'column', width:'50%'}}>
						<View style={{flexDirection:'row',  justifyContent:'space-between', marginBottom:10, paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Total R$: 
							</Text>

							<Text style={{color:'#FFF'}}>
								{vr_venda ? vr_venda : '0,00'}
							</Text>
						</View>
						
						<View style={{flexDirection:'row',  justifyContent:'space-between', marginBottom:10, paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Descontos R$:
							</Text>

							<Text style={{color:'#FFF'}}>
								{vr_desconto ? vr_desconto : '0,00'}
							</Text>
						</View>
						<View style={{flexDirection:'row',  justifyContent:'space-between', paddingRight:10, paddingLeft:10}}>
							<Text style={{fontWeight:'bold', marginRight:10, color:'#FFF'}}>
								Cobranças R$:
							</Text>

							<Text style={{color:'#FFF'}}>
								{vr_cobrancas ? vr_cobrancas : '0,00'}
							</Text>
						</View>
						
					</View>
				</View>
			</View>
		</>
	)
}

export default ResumoPedido;