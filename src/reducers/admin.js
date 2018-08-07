import { REQUEST_, SUCCESS_, FAILURE_ } from '../utils/api-types';
import {
    FETCH_LIST_ADMINS, HIDE_UPDATE_ADMIN_MODEL, SET_ERROR_MESSAGE, SHOW_UPDATE_ADMIN_MODEL,
    UPDATE_PAGINATION_LIST_ADMINS
} from '../actions/types';

const initialState = {
    isFetching : false,
    admins : null,
    errors : null,
    pagination : {
        current: 1,
        pageSize: 8,
        total: 0
    },
    updateAdmin : {
        showModel: false,
        data: {}
    }
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(FETCH_LIST_ADMINS):
            return {
                ...state,
                isFetching : true
            };
        case SUCCESS_(FETCH_LIST_ADMINS):
            return {
                ...state,
                isFetching: false,
                errors: null,
                admins : action.data.users,
                pagination : {
                    ...state.pagination,
                    total : action.data.total
                }
            };
        case FAILURE_(FETCH_LIST_ADMINS):
            return {
                ...state,
                isFetching: false,
                errors: action.messages
            };
        case UPDATE_PAGINATION_LIST_ADMINS:
            return {
                ...state,
                pagination : {
                    ...state.pagination,
                    ...action.pagination
                }
            };
        case SHOW_UPDATE_ADMIN_MODEL:
            return {
                ...state,
                updateAdmin : {
                    showModel: true,
                    data: action.updateAdminData
                }
            };
        case HIDE_UPDATE_ADMIN_MODEL:
            return {
                ...state,
                updateAdmin : {
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
