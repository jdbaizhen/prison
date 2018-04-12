import { post } from './fetch'

export let getGroupSearch = (data) => (
    post('/group/search',data)
);

export let delRoleTableA = (delIds) => (
    post('/group/del',delIds)
)

export let getAllPrivilegeA = () => (
    post('/privilege/searchAll',{})
)

export let getGroupIdInfoA = (id) => (
    post('/group/searchById',{id:id})
)

export let editTableFormA = (data) => (
    post('/group/addRole',data)
)
