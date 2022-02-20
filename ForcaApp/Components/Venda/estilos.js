import {StyleSheet} from 'react-native'

const estilos = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		backgroundColor:'#008B8B',//363636//FFF
		padding:0,
	},
	texto_col:{
		 color:'#000',
	},
	input: {
	    height: 40,
	    margin: 12,
	    borderWidth: 1,
	    padding: 10,
	    borderRadius:50,
	    //textAlign:'center',
	    backgroundColor:'#FFF',
	    borderColor:'#000',
	    width:'80%',
	    flexDirection:'column',
	},
	input_form: {
	    height: 40,
	    margin: 12,
	    marginTop: 0,
	    borderWidth: 1,
	    padding: 10,
	    borderRadius:50,
	    //textAlign:'center',
	    backgroundColor:'#FFF',
	    borderColor:'#000',
	    width:'90%',
	    flexDirection:'column',
	    textAlign:'center',
	    alignSelf:'center',
	},
})

export default estilos;