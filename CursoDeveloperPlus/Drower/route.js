import React from 'react';
import {View, Text, Image, useWindowDimensions} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {Home, Profile} from './Views/index.js'
import {NavigationDrawerStructure} from './NavigationDrawerStructure/index.js'

const Drawer = createDrawerNavigator();

const Rota = ()=>{
    const dimensions = useWindowDimensions();

    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{activeTintColor:'green', inactiveTintColor: '#000', labelStyle:{fontSize: 20}}} drawerPosition="left" backBehavior="history" hideStatusBar={true}  drawerType={dimensions.width >= 700 ? "permanent" : 'slide'}  >
                <Drawer.Screen name="HomeMenu" component={Home} options={{ drawerLabel: 'Home', drawerIcon: ()=>(<Image style={{width: 50, height:50}} source={require('../../assets/rastreio.png')} />) }} />
                <Drawer.Screen name="Profile" component={Profile} options={{ drawerLabel: 'Profile', drawerIcon: ()=>(<Image style={{width: 50, height: 50}} source={require('../../assets/logo.jpeg')} />) }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default Rota;