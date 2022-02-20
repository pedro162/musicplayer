import {StyleSheet, StatusBar} from 'react-native'

const estilos = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: '#008B8B',//1C1C1C
        minHeight:60,
        maxHeight:60,//
       // marginTop:StatusBar.currentHeight,//20,
        paddingTop:10,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',

        
    },
    title:{
        color: '#FFF',//fff
        fontSize: 18,
        fontWeight:'bold'

    }
})


export default estilos;