import React, { useEffect, useState, useMemo } from 'react';
//useMemo usado para memorizar o valor de uma variável até que alguma coisa mude
//useEffect é uma 
import { Link } from 'react-router-dom';
//react-router-dom fornece um componente chamado Link, o qual serve para poder criar . ex: quando usuario clicar vai para outra rota
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    //spots é o nome do Estado, setSpots é a função para atualizar este estado
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    //só vou fazer a conexão com o usuário, caso o user_id tenha mudado
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);
    
    useEffect(() => {
        //toda vez que receber uma mensagem com o nome message (l28, server.js), os dados que receber vão ser printados na tela
        //socket.on('message', data => {
            //console.log(data);
        //})

        //toda vez que se conecta com o servidor, retorna a mensagem Stack
        //socket.emit('omni', 'Stack');

        //vai ouvir booking_request, pegar todos os dados de booking_request e dar o console log
        socket.on('booking_request', data => {
            //console.log(data);
            setRequests([ ...requests, data]);
        })
    }, [requests, socket]);

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

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);
        //após aprovar a solicitação, vai remover ela da lista:
        //vai pegar todas as requisições, filtrá-las e remover aquela requisição que acabou de aprovar. Vai verificar se o id da requisção é diferente da requisição que aprovei
        setRequests(requests.filter(request => request._id !== id));
    }

   async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() =>handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}

            </ul>
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