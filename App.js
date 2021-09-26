import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './Player/routes'
//import RouteEstudo from './CursoDeveloperPlus/route.js'
import Rota from './CursoDeveloperPlus/Drower/route.js'

export default function App() {
  const estudo = false;
  const frete = false;
  const player = true;

  
  return (
    estudo ?  <Rota/> :  (player ? <Routes/>: null)
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
