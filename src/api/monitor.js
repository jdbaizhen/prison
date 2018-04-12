import {get,post} from './fetch';
export const getTableDataA=()=>(
	get('/camera/search')
);
export const delTableDataA=(data)=>(
	post('/camera/delete',data)
);
export const  addTableDataA=(data)=>(
	post('/camera/add',data)
);
export const getSeeDataA=(data)=>(
	post('/camera/get',data)
);
export const editTableDataA=(data)=>(
	post('/camera/edit',data)
);