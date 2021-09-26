import React from 'react';
import {Text, StyleSheet, View, Image, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading: true,
            data: []
        }
    }

    static navigationOptions={
        drawerLabel: 'Home',

        drawerIcon: ({focused, tintColor})=>(
            <Image
                style={styles.logo}
                style={{width: 40, height: 40}}
                source={require('../../assets/icon.png')}
            />
        )
    }

    async componentDidMount(){
        let totalRec = 0;
        try{
            totalRec = await AsyncStorage.getItem('@CGK_API');
            if(totalRec === null){
                totalRec = 1000;
            }

        }catch(e){
            alert(e)

        }



        fetch(`https://randomuser.me/api/?results=${totalRec}`)
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    data: res.results || [],
                    loading: false
                })
            })
    }

    render(){
        return(
            <Text> Ok </Text>
        )
    }

}