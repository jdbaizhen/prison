import * as types from '../action-types'
import { getRegisterSearchA ,getIdInfoA, getCameraInfoA} from '@/api/register'

export let RegisterTable = (data) => (dispatch) => {
    getRegisterSearchA(data).then( data => {
        if(data.result){
            let tableData = JSON.parse(data.data);
            dispatch({
                type : types.REGISTER_GET_TABLE,
                details : tableData.details,
                count : tableData.count
            })
            return {
                result : data.result
            }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
}

export let getCameraInfo = (value) => (dispatch) => (
    getCameraInfoA(value).then( data => {
        if(data.result){
            let cameraInfo = JSON.parse(data.data);
            return {
                result : data.result,
                details : cameraInfo
            }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
)

export let setRegisterSearchTerm = (data) => (dispatch) => {
    dispatch({
        type : types.REGISTER_SET_SEARCHTERM,
        personName : data.name,
        personNumber : data.number
    })
}

export let setPage = (num1,num2) => (dispatch) => {
    dispatch({
        type : types.REGISTER_SET_PAGETERM,
        pageIndex : num1,
        pageSize : num2
    })
}

export let setRegisterSortTerm = (data) => (dispatch) => {
    dispatch({
        type : types.REGISTER_SET_SORTTERM,
        flag : data.flag,
        sort : data.sort
    })
}

export let getRegisterById = (id) => (dispatch) => (
    getIdInfoA(id).then( data => {
        if(data.result){
            let idData = data.data;
            dispatch({
                type : types.REGISTER_GET_IDINFO,
                data : idData
            })
            return {
                result : data.result,
                data : idData
            }
        }else{
            return {
                result : data.result,
                err : data.message
            }
        }
    })
)