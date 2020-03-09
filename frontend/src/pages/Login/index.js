import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    //history é uma propriedade que é usada para fazer uma navegação
    //criar estado
    const [email, setEmail] = useState(''); //string está em branco, pois o valor que inicia um input é um valor vazio
    //é usado o colchetes porque a função useState retorna um vetor com duas posições, então o colchetes vai pegar esses dois valores
    //variável email é a string de useState em branco, é atualizada em tempo real
    //função setEmail serve para atualizar o valor do estado, da variável email

    async function handleSubmit(event){
        event.preventDefault();

        //chamar API
        //primeiro parâmetro: rota sessions
        //segundo parâmetro: é o objeto email
        const response = await api.post('/sessions', { email });
        //quando a função chegar na linha21, ela vai aguardar a finalização dessa chamada api (await) e quando devolver uma resposta, será armazenada na variável response
    
        //pegar o id do usuário:
        const { _id } = response.data;
        //console.log( _id );

        localStorage.setItem('user', _id);
        //localStorage é o banco de dados do navegador

        history.push('/dashboard');
        //history faz a navegação de forma automática
    }

    return (
        <>
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
        </>
    )
}