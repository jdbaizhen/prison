import { get, post} from './fetch'

export let getRegisterSearchA = (data) => (
    post('/general/getByModel',data)
)

export let getIdInfoA = (id) => (
    post('/general/getById',id)
)

export let getCameraInfoA = (value) => (
    post('/camera/useIpc',value)
)