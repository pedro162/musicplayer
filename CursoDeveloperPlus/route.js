import 'react-native-gesture-handler'
import React from 'react';
import {View, Text, StyleSheet, TexInput, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack'
import {Home, Toque, FlatListItem, SectionListApp, AnimatedComponent, HomeScreen, Imagem, Abas} from './Views/index.js';

const Navegacao = createStackNavigator();

/*
    const Navegacao = createStackNavigator({
        HOME:{
            screen: HomeScreen 
        },
        Pessoas:{
            screen: Pessoas 
        },
        {
            initialRouteName: 'HOME'
        }
    });

    const AppContainer = createAppContainer(Navegacao)
*/

const RouteAppPlus = ()=>{

    return(
        <NavigationContainer>
            <Navegacao.Navigator initialRouteName="Home">
                <Navegacao.Screen name="Home" component={Abas}  />
                <Navegacao.Screen name="Toque" component={Toque} />
                <Navegacao.Screen name="FlatListItem" component={FlatListItem} />
                <Navegacao.Screen name="SectionListApp" component={SectionListApp} />
                <Navegacao.Screen name="AnimatedComponent" component={AnimatedComponent} />
                <Navegacao.Screen name="HomeScreen" component={HomeScreen} />
                <Navegacao.Screen name="Imagem" component={Imagem} />
            </Navegacao.Navigator>
        </NavigationContainer>
    )
}

export default RouteAppPlus;