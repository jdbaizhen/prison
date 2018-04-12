import {post} from './fetch';

export const getTableDataA = (data) => (
	post('/case/getByModel', data)
);
export const delTableDataA = (data) => (
	post('/case/deleteBatch', data)
);
export const addTableDataA = (data) => (
	post('/case/add', data)
);
export const getSeeDataA = (data) => (
	post('/case/getById', data)
);
export const editTableDataA = (data) => (
	post('/case/update', data)
);
export const getModalTableDataA = (data) => (
	post('/case/getWarnInfos', data)
);