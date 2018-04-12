import {loginA, logoutA} from "../../api/login";
import {push} from 'react-router-redux';
import {setSession} from '../../utils/util';

export let login = (userData) =>(dispatch)=> (
	loginA(userData).then(data => {
		if (data.result) {
			let userInfo = JSON.parse(data.data);
			setSession('username', userInfo.username);
			let obj={
				roleName:[]
			};
			userInfo.roleList.map(item=>{
				obj.roleName.push(item.name);
				item.pList.map(ite=>{
					let key=ite.split('_')[0];
					if(!obj[key]){
						obj[key]={}
					}
					obj[key][ite]=1
				})
			});
			for(let key in obj){
				setSession(key,obj[key])
			}
			dispatch(push('/monitor'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let logout = () =>(dispatch)=> (
	logoutA().then(data => {
		if (data.result) {
			sessionStorage.clear();
			dispatch(push('/'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);