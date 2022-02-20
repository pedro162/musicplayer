import React from 'react';
import {View, ProgressBarAndroid} from 'react-native';
import * as Progress from 'react-native-progress';


const Progresso = ({...props})=>{	
	return(
		<View style={{width:'100%', height:'80%', justifyContent:'center', alignItems:'center'}}>
		
			
			<Progress.Circle size={30} indeterminate={true} borderWidth={1}  {...props}  />

        </View>

	)
}


export default Progresso;