import * as Types from '../action-types'
import cloneDeep from 'lodash.clonedeep';

let initSearchTerm = {
    name : undefined,
    pageIndex : 1,
    pageSize : 10,
    updateIds : []
}

let roleSearchTermR = ( state = cloneDeep(initSearchTerm), action) => {
    switch ( action.type ) {
        case Types.ROLE_SET_SEARCHTERM:
            return {
                ...state,
                name : action.name
            }
        case Types.ROLE_SET_SEARCHPAGE:
            return {
                ...state,
                pageIndex : action.pageIndex,
                pageSize : action.pageSize
            }
        case Types.ROLE_UPDATE:
            return {
                ...state,
                updateIds : action.updateIds
            }
        default:
            return state;
    }
}


let initTable = {
    count : 0,
    details : []
}

let roleTableR = ( state = cloneDeep(initTable) , action) => {
    switch ( action.type ) {
        case Types.ROLE_GET_GROUPLIST:
            return {
                ...state,
                count : action.count,
                details : action.details
            }
        default:
            return state
    }
}

let initPrivilege = {
    privilege : [],
}

let rolePrivilegeR = ( state = cloneDeep(initPrivilege) , action) => {
    switch ( action.type ) {
        case Types.ROLE_GET_ALLPRIVILEGE:
            return {
                ...state,
                privilege : action.privilege
            }
        case Types.ROLE_PRIVILEGE_UPDATE:
            return {
                ...state,
                privilegeInfo : action.privilegeInfo
            }
        default:
            return state
    }
}


export default {
    roleSearchTermR,
    roleTableR,
    rolePrivilegeR
}