import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Rota from './ForcaApp/route.js'
import config from './ForcaApp/Database/Config/config.js';
import {createConnection} from 'typeorm'

export default function App() {
  	const connection = React.useCallback(async ()=>{
	  	try{

	  		const connection = await createConnection(config);
        //await connection.runMigrations()
        //await connection.synchronize()

	  	}catch(err){
	  		console.log(err.message)
	  	}
  	})

  	React.useEffect(()=>{
      const conectar = async()=>{
        await connection()
      }
  		conectar()
  
  	}, []);

  	return (
     	<Rota/>
  	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
