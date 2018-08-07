import React  from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../containers/Layout/index';
import Login from '../containers/Login/index';
import Home from '../containers/Home';
import ListAdmins from '../containers/AdminUser/List'
import AddAdmin from '../containers/AdminUser/Add'
import AddUser from '../containers/B2BUser/AddUser'
import ListUsers from '../containers/B2BUser/ListUser'
import AddEvent from '../containers/Events/AddEvent'
import ListEvents from '../containers/Events/ListEvents'

export const childRoutes = [
    {
        'path':'/home',
        'component': Home,
        'exactly': true,
        'root': false
    },
    {
        'path':'/list-admins',
        'component': ListAdmins,
        'exactly': true,
        'root': true
    },
    {
        'path':'/add-admin',
        'component': AddAdmin,
        'exactly': true,
        'root': true
    },
    {
      'path':'/add-user',
      'component': AddUser,
      'exactly': true,
      'root': false
    },
    {
        'path':'/list-users',
        'component': ListUsers,
        'exactly': true,
        'root': false
    },
    {
        'path':'/add-event',
        'component': AddEvent,
        'exactly': true,
        'root': false
    },
    {
        'path':'/events-list',
        'component': ListEvents,
        'exactly': true,
        'root': false
    },
];

const routes = (
    <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Layout}/>
    </Switch>
);

export default routes
