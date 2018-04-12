import config from '../config/index';
require('es6-promise').polyfill();
import 'whatwg-fetch';

export const get=(url)=>(
	fetch(config.requestPrefix+url,{
		method:'GET',
		credentials:'include',
		headers:{
			accept:"application/json"
		}
	}).then(res=>res.json())
);
export const post=(url,data)=>(
	fetch(config.requestPrefix+url,{
		method:'POST',
		credentials:'include',
		headers:{
			'Content-Type':'application/json',
			accept:'application/json'
		},
		body:JSON.stringify(data)
	}).then(res=>res.json())
);
