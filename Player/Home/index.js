import React from 'react'
import {View, Text, FlatList} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FontaWesome5 from 'react-native-vector-icons/FontAwesome5';

import Recentes from '../PlaySlists/Recentes/index'
import Todos from '../PlaySlists/Todos/index.js'
import SearshMusic from '../PlaySlists/SearshMusic/index.js'
import Radio from '../PlaySlists/Radio/index.js'


const Tab = createMaterialBottomTabNavigator();

const Home = ({navigation}) => {

    return (
            <Tab.Navigator
            
                activeColor="#fff"
                inactiveColor="#ddd"
                barStyle={{ backgroundColor: '#1C1C1C', fex:1, width: '100%'}}
            >
                
            <Tab.Screen

                name="Home"
                component={Recentes}
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon:({color})=>(<FontaWesome5 name='home' color="#fff" size={24} />),
                }}
            />

            <Tab.Screen

            name="Search"
            component={SearshMusic}
            options={{
                tabBarLabel:'Search',
                tabBarIcon:({color})=>(<FontaWesome5 name='search' color="#fff" size={24} />),
            }}
            />


            <Tab.Screen

            name="Radio"
            component={Radio}
            options={{
                tabBarLabel:'Radio',
                tabBarIcon:({color})=>(<FontaWesome5 name='broadcast-tower' color="#fff" size={20} />),
            }}
            />

            <Tab.Screen

                name="Lybrary"
                component={Todos}
                options={{
                    tabBarLabel:'Lybrary',
                    tabBarIcon:({color})=>(<FontaWesome5 name='folder-open' color="#fff" size={24} />),
                }}
            />

            
        </Tab.Navigator>
    )
}
export default Home

