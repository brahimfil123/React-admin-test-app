import { REQUEST_, SUCCESS_, FAILURE_ } from '../utils/api-types';
import {
    FETCH_LIST_EVENTS, HIDE_UPDATE_EVENT_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_EVENT_MODEL,
    UPDATE_PAGINATION_LIST_EVENTS, FETCH_LIST_ESTABLISHMENTS
} from '../actions/types';

const initialState = {
    isFetching : false,
    events : null,
    errors : null,
    pagination : {
        current: 1,
        pageSize: 5,
        total: 0
    },
    updateEvent : {
        showModel: false,
        data: {}
    }
};

export default function events(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(FETCH_LIST_EVENTS):
            return {
                ...state,
                isFetching : true
            };
        case SUCCESS_(FETCH_LIST_EVENTS):
            return {
                ...state,
                isFetching: false,
                errors: null,
                events : action.data.events,
                pagination : {
                    ...state.pagination,
                    total : action.data.total
                }
            };
        case FAILURE_(FETCH_LIST_EVENTS):
            return {
                ...state,
                isFetching: false,
                errors: action.messages
            };
        case UPDATE_PAGINATION_LIST_EVENTS:
            return {
                ...state,
                pagination : {
                    ...state.pagination,
                    ...action.pagination
                }
            };
        case SHOW_UPDATE_EVENT_MODEL:
            return {
                ...state,
                updateEvent : {
                    showModel: true,
                    data: action.updateEventData
                }
            };
        case HIDE_UPDATE_EVENT_MODEL:
            return {
                ...state,
                updateEvent : {
                    showModel: false,
                    data: {}
                }
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
