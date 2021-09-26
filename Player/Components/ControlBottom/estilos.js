import {StyleSheet} from 'react-native'

const estilos = StyleSheet.create({
    container:{
        backgroundColor: '#1C1C1C', 
        width: '100%',
        flexDirection:'column',
        
        
    },
    title:{
        color: '#fff',
        fontSize: 18
    },
    controlers:{
        
        width: '80%',
        flexDirection:'row',
        justifyContent: 'space-between',
        textAlign:'center',
        alignItems:'center',
        margin:'auto',


    },
    artista_musica:{
        color: '#fff',
        width: '80%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom: 20,
        

        
    }
})


export default estilos;