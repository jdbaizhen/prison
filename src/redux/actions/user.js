import * as types from '../action-types'
import {getUserListA,getSeeDataA,getAllGroupA,delUserListA,updateUserInfoA} from '../../api/user'

export let getUserList = (data) => (dispatch) => (
    getUserListA(data).then(data => {
        if(data.result){
            const userList = JSON.parse(data.data);
            dispatch({
                type : types.USER_GET_LIST,
                count : userList.count,
                details : userList.details
            });
            return {result : data.result}
        }else{
            return {result : data.result, message : data.message}
        }
    })
)

export let setSearchTerm = (term) => (dispatch) => {
    dispatch({
        type : types.USER_SET_SEARCHTERM,
        username : term.username,
        name: term.name,
        beginTime: term.beginTime,
        endTime: term.endTime,
    })
}

export let setPage = (num1,num2) => (dispatch) => {
    dispatch({
        type : types.USER_SET_SEARCHPAGE,
        pageSize : num2,
        pageIndex : num1
    })
}

export let getSeeData = (id) => (dispatch) =>(
     getSeeDataA(id).then(data => {
         if(data.result){
             const tableData = JSON.parse(data.data);
             dispatch({
                 type : types.USER_GET_ONEADMIN,
                 data : tableData
             })
             return { result : data.result , data : tableData}
         }else{
             return { result : data.result ,err : data.message}
         }
     })
)

export let getAllGroup = () => (dispatch) => (
    getAllGroupA({}).then(data => {
        if(data.result){
            const tableData = data.data;
            dispatch({
                type : types.USER_GET_ALLGROUP,
                groups : tableData
            })
            return { result : data.result , groups : tableData}
        }else{
            return { result : data.result , err : data.message}
        }
    })
)

export let delUserList = (param) => (dispatch) => (
    delUserListA(param).then(data => {
        if(data.result){
            dispatch({
                type : types.USER_LIST_UPDATE,
                updateId : []
            })
            return { result : data.result }
        }else{
            return { result : data.result , err : data.message}
        }
    })
)

export let updateUserInfo = (data) => (dispatch) => (
    updateUserInfoA(data).then(data => {
        if(data.result){
            dispatch({
                type : types.USER_LIST_UPDATE,
                updateId : []
            })
            return { result : data.result }
        }else{
            return { result : data.result , err : data.message}
        }
    })
)


