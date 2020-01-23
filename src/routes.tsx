import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import PantryList from './pantry/pantryList';
import UserRegistration from './user/register/userRegistration';
import NavBar from './nav-bar/navbar';
import {loadState} from './store/actions'

import apiMiddleware from "./middleware/api";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer, loadState(), applyMiddleware(apiMiddleware));

const Routes = () => (
    <Provider store={store}>
        <BrowserRouter >
            <NavBar/>
            <Route exact path="/" component={App}/>
            <Route exact path="/pantry" component={PantryList}/>
            <Route exact path="/register" component={UserRegistration}/>
        </BrowserRouter>
    </Provider>
);

export default Routes;