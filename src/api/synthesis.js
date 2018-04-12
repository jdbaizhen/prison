import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/monitor/getByModel',data)
);
export const getPlayA=(data)=>(
	post('/monitor/getVideoInfo',data)
);