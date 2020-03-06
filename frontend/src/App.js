import React, { useState } from 'react';
//useState: serve para criação de estados dentro da aplicação
import api from './services/api';
import './App.css';

import logo from './assets/logo.svg';

function App() {
  //criar estado
  const [email, setEmail] = useState(''); //string está em branco, pois o valor que inicia um input é um valor vazio
  //é usado o colchetes porque a função useState retorna um vetor com duas posições, então o colchetes vai pegar esses dois valores
  //variável email é a string de useState em branco, é atualizada em tempo real
  //função setEmail serve para atualizar o valor do estado, da variável email

  function handleSubmit(event){
    event.preventDefault();

    console.log(email);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Seu melhor e-mail"
            value={email}
            //toda vez que executa um onChange (toda vez que o usuário alterar o valor do input, executará um onChange), recebe um evento
            //o valor preenchido no input está dentro de event.target....
            onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
   </div>
  );
}

export default App;
