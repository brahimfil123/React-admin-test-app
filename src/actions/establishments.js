import {get} from '../api/config/http'
import {FETCH_LIST_ESTABLISHMENTS} from './types'
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/api-types";
import _ from 'lodash';

export function establishmentsListRequest() {
    return {
        type: REQUEST_(FETCH_LIST_ESTABLISHMENTS)
    }
}

export function establishmentsListSuccess(data) {
    return {
        type: SUCCESS_(FETCH_LIST_ESTABLISHMENTS),
        data
    }
}

export function establishmentsListFailure(messages) {
    return {
        type: FAILURE_(FETCH_LIST_ESTABLISHMENTS),
        messages
    }
}

export function loadListEstablishmentsAction() {
    return (dispatch, getState) => {
        let {establishments} = getState();

        dispatch(establishmentsListRequest());
        get(`/backoffice/getAllEstablishments/`)
            .then(res => {
                console.log(res)
                if(res.success){
                    
                    dispatch(establishmentsListSuccess(res.data));
                }    
                else
                    dispatch(establishmentsListFailure(res.messages))
            })
            .catch(err => {
                dispatch(establishmentsListFailure(['connection error']));
            })
    }
}