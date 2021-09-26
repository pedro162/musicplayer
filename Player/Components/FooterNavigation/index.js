import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {View, Text} from 'react-native'

import Recentes from '../../PlaySlists/Recentes/index.js'
import Todos from '../../PlaySlists/Todos/index.js'

const Tab = createMaterialBottomTabNavigator()

const FooterNavigation = (props) => {
    return (
        <Tab.Navigator
            activeColor="#fff"
            inactiveColor="#ccc"
            barStyle={{ backgroundColor: '#000' }}
            labeled={false}

        >
            <Tab.Screen
                name="Home"
                component={Recentes}

                options={{
                    tabBarLabel:'Início',
                    tabBarIcon:({color})=>{
                        return(
                            <FontAwesomeIcon rocket='home' size={26} />
                        )
                    }
                }}
            />

            <Tab.Screen
                name="Todos"
                component={Todos}

                options={{
                    tabBarLabel:'Início',
                    tabBarIcon:({color})=>{
                        return(
                            <FontAwesomeIcon rocket='home' size={26} />
                        )
                    }
                }}
            />

            
        </Tab.Navigator>
    )
}


export default FooterNavigation
