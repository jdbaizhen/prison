import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/trace/getByModel',data)
);
export const delTableDataA=(data)=>(
	post('/trace/deleteBatch',data)
);
export const  addTableDataA=(data)=>(
	post('/trace/add',data)
);
export const getSeeDataA=(data)=>(
	post('/trace/getDetails',data)
);
export const editTableDataA=(data)=>(
	post('/trace/update',data)
);