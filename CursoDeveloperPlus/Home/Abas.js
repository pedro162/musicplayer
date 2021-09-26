import React from 'react';
import {View} from 'react-native';
import Home from './index.js';
import Toques from '../SectionList/index.js'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
const Aba = createMaterialBottomTabNavigator()

const Abas = ({navigation})=>{


    return(
        <Aba.Navigator
            activeColor="#fff"
            inactiveColor="#ccc"
            barStyle={[{backgroundColor:'blue'}]}
            initialRouteName="Home"
            backBehavior="history"
            labeled={false}
        >
            <Aba.Screen
                name="Home"
                component={Home}
                options={
                    {tabBarIcon:(color)=>(
                        <Icon name="home" color="#ffff" size={40}/>
                    )}
                }
            />

            <Aba.Screen
                name="Toques"
                component={Toques}
                options={{
                    tabBarIcon:(color)=>(
                        <Icon name="edit" color="#fff" size={40} />
                    )
                }}
            />

        </Aba.Navigator>
    )
}


export default Abas;