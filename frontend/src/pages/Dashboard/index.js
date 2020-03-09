import React, { useEffect, useState } from 'react';
//useEffect é uma 
import { Link } from 'react-router-dom';
//react-router-dom fornece um componente chamado Link, o qual serve para poder criar . ex: quando usuario clicar vai para outra rota
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    //spots é o nome do Estado, setSpots é a função para atualizar este estado
    useEffect(() => {
        async function loadSpots() {
            //buscar o user_id:
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            setSpots(response.data);
        }
        loadSpots();
    }, []);
    //useEffect recebe 2 parâmetros. O 1o é uma arrow function. o 2o é um array de dependências

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn"> Cadastrar novo spot </button>
            </Link>
        </>
    )
}