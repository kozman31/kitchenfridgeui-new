import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import PantryList from './pantry/pantryList';
import UserRegistration from './user/register/userRegistration';
import NavBar from './nav-bar/navbar';


const Routes = () => (
    <BrowserRouter >
        <NavBar/>
        <Route exact path="/" component={App}/>
        <Route exact path="/pantry" component={PantryList}/>
        <Route exact path="/register" component={UserRegistration}/>
    </BrowserRouter>
);

export default Routes;