import * as Types from '../action-types'
import cloneDeep from 'lodash.clonedeep';

let initSearchTerm = {
    pageIndex : 1,
    pageSize : 10,
    username : undefined,
    name : undefined,
    beginTime : undefined,
    endTime : undefined
}

let userTermR = (state = cloneDeep(initSearchTerm),action) => {
    switch (action.type){
        case Types.USER_SET_SEARCHTERM:
            return {
                ...state,
                username : action.username,
                name : action.name,
                beginTime: action.beginTime,
                endTime: action.endTime,
                pageIndex: 1
            }
        case Types.USER_SET_SEARCHPAGE:
            return {
                ...state,
                pageIndex : action.pageIndex,
                pageSize : action.pageSize
            }
        case Types.USER_LIST_UPDATE:
            return {
                ...state,
                updateId : action.updateId
            }
        default:
            return state;
    }
}

let initUserList = {
    details: [],
    count: 0,
}

let userListR = (state = cloneDeep(initUserList),action) => {
    switch (action.type){
        case Types.USER_GET_LIST:
            return {
                ...state,
                details : action.details,
                count : action.count
            };
        case Types.USER_GET_ONEADMIN:
            return {
                ...state,
                data : action.data
            }
        default:
            return state;
    }
};

let initUserForm = {
    groups : []
}

let userFormR = ( state = cloneDeep(initUserForm), action) => {
    switch (action.type) {
        case Types.USER_GET_ALLGROUP:
            return {
                ...state,
                groups : action.groups
            }
        default:
            return state
    }
}


export default {
    userTermR,
    userListR,
    userFormR
}