import { REQUEST_, SUCCESS_, FAILURE_ } from '../utils/api-types';
import {FETCH_USER, LOGIN} from '../actions/types';

const initialState = {
    user: null,
    loggingIn: false,
    loginErrors: null
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(LOGIN):
            return {
                ...state,
                loggingIn: true
            };
        case SUCCESS_(LOGIN):
            return {
                ...state,
                loggingIn: false,
                loginErrors: null
            };
        case FAILURE_(LOGIN):
            return {
                ...state,
                loggingIn: false,
                loginErrors: action.messages
            };
        case SUCCESS_(FETCH_USER):
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}
