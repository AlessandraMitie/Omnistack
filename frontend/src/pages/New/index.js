import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        //useMemo receberá 2 parâmetros. o 1o é uma função e o 2o é um array de quando ele deve executarapós ocorrer alguma alteraçãod e variável
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
            //se existir algo em thumbnail, vai executar URL (que é uma variável global do html)
            //createObjectURL vai criar uma url para uma variável temporária que ainda não foi feito upload
            //thumbnail é um parâmetro
            //se não retornar null
        }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        //append é uma função que vai adicionar uma informação dentro do objeto
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
                //se existir uma thumbnail ou preview, vou adicionar uma classe que se chama has-yhumbnail, sse não não vai adicionar nada
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"   
                value={company}
                onChange={event => setCompany(event.target.value)}
                //recebo o evento e executo setCompany
            />

            <label htmlFor="techs"> TECNOLOGIAS *<span>(separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price"> VALOR DA DIÁRIA * <span>(em branco para GRATUITO</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}