import {post, get} from '../api/config/http'
import {
    FETCH_LIST_ADMINS, HIDE_UPDATE_ADMIN_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_ADMIN_MODEL,
    UPDATE_PAGINATION_LIST_ADMINS
} from './types'
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/api-types";

export function adminListRequest() {
    return {
        type: REQUEST_(FETCH_LIST_ADMINS)
    }
}

export function adminListSuccess(data) {
    return {
        type: SUCCESS_(FETCH_LIST_ADMINS),
        data
    }
}

export function adminListFailure(messages) {
    return {
        type: FAILURE_(FETCH_LIST_ADMINS),
        messages
    }
}

export function updatePagination (pagination) {
    return {
        type: UPDATE_PAGINATION_LIST_ADMINS,
        pagination
    }
}

export function loadListAdminsAction(filters) {
    return (dispatch, getState) => {
        let {admin} = getState();

        dispatch(adminListRequest());
        let data = {
            ...admin.pagination,
            ...filters
        };
        let query = ':status:field'
        .replace(':status', (data.status)?`&status=${JSON.stringify(data.status)}`:'')
        .replace(':field', (data.field && data.order)?`&field=${data.field}&order=${data.order}`:'')
        get(`/backoffice/getAllUsersAdmin/?current=${data.current}&pageSize=${data.pageSize}${query}`)
            .then(res => {
                if(res.success)
                    dispatch(adminListSuccess(res.data));
                else
                    dispatch(adminListFailure(res.messages))
            })
            .catch(err => {
                dispatch(adminListFailure(['connection error']));
            })
    }
}

export function showUpdateModal(updateAdminData) {
    return {
        type: SHOW_UPDATE_ADMIN_MODEL,
        updateAdminData
    }
}

export function hideUpdateModal() {
    return {
        type: HIDE_UPDATE_ADMIN_MODEL
    }
}

export function updateAdmin(data) {
    return (dispatch) => {
        if (data.password === undefined) {
            delete data.password
        }

        post('/backoffice/updateUserAdmin', data)
            .then(data => {
                if(data.success)
                    dispatch(loadListAdminsAction({}));
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