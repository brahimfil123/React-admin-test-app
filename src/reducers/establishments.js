import { REQUEST_, SUCCESS_, FAILURE_ } from '../utils/api-types';
import {FETCH_LIST_ESTABLISHMENTS, SET_ERROR_MESSAGE} from '../actions/types';

const initialState = {
    isFetching : false,
    establishments : null,
    errors : null
};

export default function establishments(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(FETCH_LIST_ESTABLISHMENTS):
            return {
                ...state,
                isFetching : true
            };
        case SUCCESS_(FETCH_LIST_ESTABLISHMENTS):
            return {
                ...state,
                isFetching: false,
                errors: null,
                establishments : action.data
            };
        case FAILURE_(FETCH_LIST_ESTABLISHMENTS):
            return {
                ...state,
                isFetching: false,
                errors: action.messages
            };
        
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
}
