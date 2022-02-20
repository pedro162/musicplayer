import React from 'react'
import {View, Text, FlatList} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

import Vendas from './index'
import Registros from './Registros.js'
import Orcamentos from './Orcamentos.js'
import Prevendas from './Prevendas.js'


const Tab = createMaterialBottomTabNavigator();
//https://reactnative.dev/docs/virtualizedlist /// Continuar os estudos aqui

const Abas = ({navigation}) => {

    return (
            <Tab.Navigator
            
                activeColor="#fff"
                inactiveColor="#ddd"
                barStyle={{ backgroundColor: '#008080', fex:1, width: '100%'}}
            >
              
            <Tab.Screen

	            name="RegistrosMenu"
	            component={Registros}
	            options={{
	                tabBarLabel:'Registros',
	                tabBarIcon:({color})=>(<FontaWesome5 name='file-signature' color="#fff" size={24} />),
	            }}
	            
            />

            <Tab.Screen

	            name="OrcamentosMenu"
	            component={Orcamentos}
	            options={{
	                tabBarLabel:'Orçamentos',
	                tabBarIcon:({color})=>(<FontaWesome5 name='file' color="#fff" size={24} />),
	            }}
            />

            <Tab.Screen

                name="PrevendasMenu"
                component={Prevendas}
                options={{
                    tabBarLabel:'Prevendas',
                    tabBarIcon:({color})=>(<FontaWesome5 name='file-contract' color="#fff" size={24} />),
                }}
            />

            <Tab.Screen

	            name="PedidosMenu"
	            component={Vendas}
	            options={{
	                tabBarLabel:'Pedidos',
	                tabBarIcon:({color})=>(<FontaWesome5 name='file-upload' color="#fff" size={24} />),
	            }}
            />

        </Tab.Navigator>
    )
}
export default Abas

