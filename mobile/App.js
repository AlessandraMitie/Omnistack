import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
//componente view é igual a div do html, serve para criar alguma caixa/box/container dentro da aplicação
//componente text é um texto simples sem estilização
//componente stylesheet

import { YellowBox } from 'react-native';
//importar as rotas:
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes />
}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});
