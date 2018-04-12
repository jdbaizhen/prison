import * as Types from '../action-types'
import cloneDeep from 'lodash.clonedeep'

let initRegisterSearchInfo = {
    pageIndex : 1,
    pageSize : 10,
    personName : undefined,
    personNumber : undefined,
    flag : undefined,
    sort : undefined,
    updateId : []
}

let RegisterSearchTermR = ( state = cloneDeep(initRegisterSearchInfo) ,action) => {
    switch (action.type) {
        case Types.REGISTER_SET_SEARCHTERM:
            return {
                ...state,
                personName : action.personName,
                personNumber : action.personNumber
            }
        case Types.REGISTER_SET_PAGETERM:
            return {
                ...state,
                pageIndex : action.pageIndex,
                pageSize : action.pageSize
            }
        case Types.REGISTER_SET_SORTTERM:
            return {
                ...state,
                flag : action.flag,
                sort : action.sort
            }
        default:
            return state
    }
}

let initRegisterTable = {
    count : 0,
    details : []
}

let RegisterTableR = ( state = cloneDeep(initRegisterTable), action) => {
    switch (action.type) {
        case Types.REGISTER_GET_TABLE:
            return {
                ...state,
                details : action.details,
                count : action.count
            }
        default :
            return state
    }
}

let initRegisterIdData = {
    id : undefined
}

let RegisterIdDataR = ( state= cloneDeep(initRegisterIdData), action ) => {
    switch ( action.type ) {
        case Types.REGISTER_GET_IDINFO:
            return {
                ...state,
                data : action.data
            }
        default:
            return state
    }
}

export default {
    RegisterTableR,
    RegisterSearchTermR,
    RegisterIdDataR
}