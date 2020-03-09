import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//BrowserRouter, Switch e Route são componentes do React

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//exportar componente Routes
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
    //o <Switch vai controlar que somente uma rota será executada por vez
}