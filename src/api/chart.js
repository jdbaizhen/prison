import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/flow/chart',data)
);