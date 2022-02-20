import React from 'react';
import {View, Text, Image, useWindowDimensions} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {Home, Venda, Cliente, Filial, Pdv, PdvStart, Pedido,VendasCobrancas, AbasVendas, Ficha, Ver} from './Views/index.js'
import {DataContex,DataStorange} from './Context/dataContext.js'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const StackNav = ()=>{

   
    return(
        <Stack.Navigator  initialRouteName="PdvStart">
          <Stack.Screen options={{ headerShown: false }} name="PdvStart" component={PdvStart} />
          <Stack.Screen options={{ headerShown: false }} name="Pdv" component={Pdv} />
          <Stack.Screen options={{ headerShown: false }} name="Pedido" component={Pedido} />
          <Stack.Screen options={{ headerShown: false }} name="VendasCobrancas" component={VendasCobrancas} />
          <Stack.Screen options={{ headerShown: false }} name="Ficha" component={Ficha} />
          <Stack.Screen options={{ headerShown: false }} name="Ver" component={Ver} />
        </Stack.Navigator>
    )
}

const Rota = ()=>{
    const dimensions = useWindowDimensions();

    return(
        <DataStorange>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="ClienteMenu" drawerContentOptions={{activeTintColor:'green', inactiveTintColor: '#000', labelStyle:{fontSize: 14}}} drawerPosition="left" backBehavior="history" hideStatusBar={true}  drawerType={dimensions.width >= 700 ? "permanent" : 'slide'}  >
                    <Drawer.Screen name="HomeMenu" component={Home} options={{ drawerLabel: 'Home', drawerIcon: ()=>(<Image style={{width: 20, height:20}} source={require('../assets/rastreio.png')} />) }} />
                    <Drawer.Screen name="VendaMenu" component={AbasVendas} options={{ drawerLabel: 'Vendas', drawerIcon: ()=>(<Image style={{width: 20, height:20}} source={require('../assets/rastreio.png')} />) }} />
                    <Drawer.Screen name="PdvMenu" component={StackNav} options={{ drawerLabel: 'Pdv', drawerIcon: ()=>(<Image style={{width: 20, height:20}} source={require('../assets/rastreio.png')} />) }} />
                    <Drawer.Screen name="ClienteMenu" component={Cliente} options={{ drawerLabel: 'Clientes', drawerIcon: ()=>(<Image style={{width: 20, height:20}} source={require('../assets/rastreio.png')} />) }} />
                    <Drawer.Screen name="FilialMenu" component={Filial} options={{ drawerLabel: 'Filiais', drawerIcon: ()=>(<Image style={{width: 20, height:20}} source={require('../assets/rastreio.png')} />) }} />
                    
                </Drawer.Navigator>
            </NavigationContainer>
        </DataStorange>
    )
}


export default Rota;