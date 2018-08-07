import { REQUEST_, SUCCESS_, FAILURE_ } from '../utils/api-types';
import {
    FETCH_LIST_USERS, HIDE_UPDATE_USER_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_USER_MODEL,
    UPDATE_PAGINATION_LIST_USERS
} from '../actions/types';

const initialState = {
    isFetching : false,
    users : null,
    errors : null,
    pagination : {
        current: 1,
        pageSize: 8,
        total: 0
    },
    updateUser : {
        showModel: false,
        data: {}
    }
};

export default function users(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(FETCH_LIST_USERS):
            return {
                ...state,
                isFetching : true
            };
        case SUCCESS_(FETCH_LIST_USERS):
            return {
                ...state,
                isFetching: false,
                errors: null,
                users : action.data.users,
                pagination : {
                    ...state.pagination,
                    total : action.data.total
                }
            };
        case FAILURE_(FETCH_LIST_USERS):
            return {
                ...state,
                isFetching: false,
                errors: action.messages
            };
        case UPDATE_PAGINATION_LIST_USERS:
            return {
                ...state,
                pagination : {
                    ...state.pagination,
                    ...action.pagination
                }
            };
        case SHOW_UPDATE_USER_MODEL:
            return {
                ...state,
                updateUser : {
                    showModel: true,
                    data: action.updateUserData
                }
            };
        case HIDE_UPDATE_USER_MODEL:
            return {
                ...state,
                updateUser : {
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
