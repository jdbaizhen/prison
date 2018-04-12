import * as types from '../action-types';
import { getGroupSearch , delRoleTableA, getAllPrivilegeA, getGroupIdInfoA , editTableFormA} from "@/api/role";

export let getGroupTable = (data) => (dispatch) => {
    getGroupSearch(data).then( data => {
        if( data.result ){
            let tableData = JSON.parse( data.data );
            dispatch({
                type : types.ROLE_GET_GROUPLIST,
                count : tableData.count,
                details : tableData.details
            })
            return { result : data.result }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
}

export let setRoleSearchTerm = (data) => (dispatch) => {
    dispatch({
        type : types.ROLE_SET_SEARCHTERM,
        name : data.name,
    })
}

export let setPage = (num1,num2) => (dispatch) => {
    dispatch({
        type : types.ROLE_SET_SEARCHPAGE,
        pageSize : num2,
        pageIndex : num1
    })
}

export let delRoleTable = (delIds) => (dispatch) => (
    delRoleTableA(delIds).then( data => {
        if(data.result){
            dispatch({
                type : types.ROLE_UPDATE,
                updateIds : []
            })
            return { result : data.result }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
)

export let getAllPrivilege = () => (dispatch) => (
    getAllPrivilegeA().then( data => {
        if(data.result){
            let tableData = JSON.parse(data.data);
            dispatch({
                type : types.ROLE_GET_ALLPRIVILEGE,
                privilege : tableData
            })
            return { result : data.result ,privilege : tableData }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
)

export let getSeeData = (id) => (dispatch) => (
    getGroupIdInfoA(id).then( data => {
        if (data.result) {
            let tableData = JSON.parse(data.data);
            dispatch({
                type: types.ROLE_PRIVILEGE_UPDATE,
                privilegeInfo: tableData
            })
            return {
                result: data.result,
                data : tableData
            }
        } else {
            return {
                result: data.result,
                err: data.message
            }
        }
    })
)

export let editTableData = (data) => (dispatch) => (
    editTableFormA(data).then(data => {
        if(data.result){
            dispatch({
                type: types.ROLE_UPDATE,
                updateIds : []
            })
            return {
                result: data.result,
            }
        } else {
            return {
                result: data.result,
                err: data.message
            }
        }
    })
)

