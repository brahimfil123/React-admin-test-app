import {post, put, get, deleteRequest} from '../api/config/http'
import {
    FETCH_LIST_USERS, HIDE_UPDATE_USER_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_USER_MODEL,
    UPDATE_PAGINATION_LIST_USERS
} from './types'
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/api-types";
import _ from 'lodash';

export function usersListRequest() {
    return {
        type: REQUEST_(FETCH_LIST_USERS)
    }
}

export function usersListSuccess(data) {
    return {
        type: SUCCESS_(FETCH_LIST_USERS),
        data
    }
}

export function usersListFailure(messages) {
    return {
        type: FAILURE_(FETCH_LIST_USERS),
        messages
    }
}

export function updatePagination (pagination) {
    return {
        type: UPDATE_PAGINATION_LIST_USERS,
        pagination
    }
}

export function loadListUsersAction(filters) {
    return (dispatch, getState) => {
        let {users} = getState();

        dispatch(usersListRequest());
        let data = {
            ...users.pagination,
            ...filters
        };
        let query = ':status:role:companyName:field'
        .replace(':role', (data.role)?`&role=${JSON.stringify(data.role)}`:'')
        .replace(':status', (data.status)?`&status=${JSON.stringify(data.status)}`:'')
        .replace(':companyName', (data.companyName)?`&companyName=${data.companyName}`:'')
        .replace(':field', (data.field && data.order)?`&field=${data.field}&order=${data.order}`:'')

        get(`/backoffice/getAllUsersB2B/?current=${data.current}&pageSize=${data.pageSize}${query}`)
            .then(res => {
                if(res.success){
                    
                    dispatch(usersListSuccess(res.data));
                }    
                else
                    dispatch(usersListFailure(res.messages))
            })
            .catch(err => {
                dispatch(usersListFailure(['connection error']));
            })
    }
}

export function showUpdateModal(updateUserData) {
    return {
        type: SHOW_UPDATE_USER_MODEL,
        updateUserData
    }
}

export function hideUpdateModal() {
    return {
        type: HIDE_UPDATE_USER_MODEL
    }
}

export function updateUser(data) {
    return (dispatch) => {
        if (data.password === undefined) {
            delete data.password
        }

        post('/backoffice/updateUserB2B', data)
            .then(data => {
                if(data.success)
                    dispatch(loadListUsersAction({}));
                else
                    dispatch(setErrorsMessage(data.messages))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function activateUser(id) {
    return (dispatch) => {
        
        put(`/backoffice/activateUserB2BAccount/${id}`)
            .then(data => {
                if(data.success)
                    dispatch(loadListUsersAction({}));
                else
                    dispatch(setErrorsMessage(data.messages))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function deleteUser(id) {
    return (dispatch) => {
        
        put(`/backoffice/deleteUserB2B/${id}`)
            .then(data => {
                if(data.success)
                    dispatch(loadListUsersAction({}));
                else
                    dispatch(setErrorsMessage(data.messages))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function setErrorsMessage(errors) {
    return {
        type: SET_ERROR_MESSAGE,
        errors
    }
}