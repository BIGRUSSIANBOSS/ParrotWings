import React from 'react';
import ReactDOM from 'react-dom'
import Register from './containers/Register';
import Login from './containers/Login';
import Account from './containers/Account';
import NoMatch from './containers/NoMatch';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/login" component={Login}/>
        <Route path="/account" component={Account}/>
        <Route path="/register" component={Register}/>
    </Router>
), document.getElementById('root'));