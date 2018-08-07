import {post, put, get, deleteRequest} from '../api/config/http'
import {
    FETCH_LIST_EVENTS, HIDE_UPDATE_EVENT_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_EVENT_MODEL,
    UPDATE_PAGINATION_LIST_EVENTS
} from './types'
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/api-types";
import _ from 'lodash';

export function eventsListRequest() {
    return {
        type: REQUEST_(FETCH_LIST_EVENTS)
    }
}

export function eventsListSuccess(data) {
    return {
        type: SUCCESS_(FETCH_LIST_EVENTS),
        data
    }
}

export function eventsListFailure(messages) {
    return {
        type: FAILURE_(FETCH_LIST_EVENTS),
        messages
    }
}

export function updatePagination (pagination) {
    return {
        type: UPDATE_PAGINATION_LIST_EVENTS,
        pagination
    }
}

export function loadListEventsAction(filters) {
    return (dispatch, getState) => {
        let {events} = getState();

        dispatch(eventsListRequest());
        let data = {
            ...events.pagination,
            ...filters
        };
        let query = ':status:companyName:field'
        .replace(':status', (data.status)?`&status=${JSON.stringify(data.status)}`:'')
        .replace(':companyName', (data.organisation)?`&organisation=${data.organisation}`:'')
        .replace(':field', (data.field && data.order)?`&field=${data.field}&order=${data.order}`:'')

        get(`/backoffice/getAllEvents/?current=${data.current}&pageSize=${data.pageSize}${query}`)
            .then(res => {
                if(res.success){
                    dispatch(eventsListSuccess(res.data));
                }    
                else
                    dispatch(eventsListFailure(res.messages))
            })
            .catch(err => {
                dispatch(eventsListFailure(['connection error']));
            })
    }
}


export function showUpdateModal(updateEventData) {
    return {
        type: SHOW_UPDATE_EVENT_MODEL,
        updateEventData
    }
}

export function hideUpdateModal() {
    return {
        type: HIDE_UPDATE_EVENT_MODEL
    }
}

export function updateEvent(data) {
    return (dispatch) => {
        
        post('/backoffice/updateEvent', data)
            .then(data => {
                if(data.success)
                    dispatch(loadListEventsAction({}));
                else
                    dispatch(setErrorsMessage(data.messages))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function publishEvent(id) {
    return (dispatch) => {
        
        put(`/backoffice/publishEvent/${id}`)
            .then(data => {
                if(data.success)
                    dispatch(loadListEventsAction({}));
                else
                    dispatch(setErrorsMessage(data.messages))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function deleteEvent(id) {
    return (dispatch) => {
        
        put(`/backoffice/deleteEvent/${id}`)
            .then(data => {
                if(data.success)
                    dispatch(loadListEventsAction({}));
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