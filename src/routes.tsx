import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import App from './App';
import PantryList from './pantry/pantryList';
import UserRegistration from './user/register/userRegistration';
import NavBar from './nav-bar/navbar';
import {loadState} from './store/actions'
import History from './store/history';
import apiMiddleware from "./middleware/api";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer';
import LoginForm from './user/login/loginForm';
import recipeForm from './recipe/recipeForm';

const store = createStore(reducer, loadState(), applyMiddleware(apiMiddleware));

const Routes = () => (
    <Provider store={store}>
        <Router history={History}>
            <NavBar/>
            <Route exact path="/" component={App}/>
            <Route exact path="/addrecipe" component={recipeForm}/>
            <Route exact path="/register" component={UserRegistration}/>
            <Route exact path="/activate/:token" component={LoginForm}/>
            <Route exact path="/login" component={LoginForm}/>
        </Router>
    </Provider>
);

export default Routes;