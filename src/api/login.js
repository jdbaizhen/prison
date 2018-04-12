import {get,post} from './fetch';
export const loginA=(data)=>(
	post('/user/login',data)
);
export const logoutA=()=>(
	get('/user/exit')
);
