import React from 'react'
import { replace } from 'react-router-redux';
import { message } from 'antd';
import _ from 'lodash'

import {get, post} from '../api/config/http';
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/api-types";
import {FETCH_USER, LOGIN} from "./types";
import {TOKEN} from '../utils/global'
import { removeData, setData } from "../utils/storage";

export function loginRequest() {
    return {
        type: REQUEST_(LOGIN)
    }
}

export function loginSuccess(user) {
    return {
        type: SUCCESS_(LOGIN),
        user
    }
}

export function loginFailure(messages) {
    return {
        type: FAILURE_(LOGIN),
        messages
    }
}

export function userSuccess(user) {
    return {
        type: SUCCESS_(FETCH_USER),
        user
    }
}

export function fetchProfile() {
    return (dispatch) => {
        get('/backoffice/getUserByToken')
            .then(res => {
                if(res.success)
                    dispatch(userSuccess(res.data));
                else
                    dispatch(logout());
            })
            .catch(err => {
                dispatch(logout())
            });
    }
}

export function login(data) {
    return (dispatch) => {
        dispatch(loginRequest());
        post('/backoffice/login', {userName: data.userName, password: data.password})
            .then(res => {
                if(res.success) {
                    setData(TOKEN, res.data);
                    dispatch(loginSuccess());
                    message.success('Connexion réussie');
                    dispatch(replace('/home'))
                } else {
                    message.error(<ul style={{textAlign: 'left'}}>{res.messages.map(message => <li>{message}</li>)}</ul>)
                    dispatch(loginFailure(res.messages));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(loginFailure(['Error connecting to server']));
            })
    }
}

export function logout() {
    return (dispatch) => {
        removeData(TOKEN);
        dispatch(replace('/login'))
    }
}
