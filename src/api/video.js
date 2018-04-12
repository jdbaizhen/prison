import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/video/search',data)
);
export const delTableDataA=(data)=>(
	post('/video/delete',data)
);
export const  addTableDataA=(data)=>(
	post('/video/add',data)
);
export const getSeeDataA=(data)=>(
	post('/video/get',data)
);
export const editTableDataA=(data)=>(
	post('/video/edit',data)
);
export const getResultDataA=(data)=>(
	post('/video/result',data)
);
export const getResultPlayA=(data)=>(
	post('/video/playback',data)
);