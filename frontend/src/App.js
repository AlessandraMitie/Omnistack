import React from 'react';
//useState: serve para criação de estados dentro da aplicação

import './App.css';

import logo from './assets/logo.svg';

//importar rotas:
import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <Routes />
      </div>
   </div>
  );
}

export default App;
