import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/trace/getTraceResult',data)
);
export const delTableDataA=(data)=>(
	post('/trace/deleteResult',data)
);
export const getTimeDataA=(data)=>(
	post('/trace/timeAxis',data)
);
export const getPlayA=(data)=>(
	post('/trace/getVideoInfo',data)
);
