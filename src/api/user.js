import { get, post } from './fetch'

export const getUserListA = (data) =>(
    post('/user/search',data)
);

export const getSeeDataA = (id) => (
    post('/user/searchById',id)
)

export const getAllGroupA = () => (
    post('/group/searchAll',{})
)

export const delUserListA = (param) => (
    post('/user/del',param)
)

export const updateUserInfoA = (data) => (
    post('/user/addUser',data)
)