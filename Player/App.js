import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Control from './Controller/index'


export default class AppPlayer extends React.Component{
    constructor(props){
        super(props)

        this.state={
            isPlaying: false,
            playbackInstance: null,
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false,
        }
    }


    componentDidMount() {
        
    }
    
    componentWillUnmount() {
        // Removes the event handler
       
    }

 

    render(){
        

        return(
            <>
                <Control/>
            </>
        )
    }
}

const styles= StyleSheet.create({
    contaner:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumCover:{
        width: 250,
        height: 250,
    },
    controls:{
        flexDirection: 'row'
    },
    control:{
        margin: 20
    }
})