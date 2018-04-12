import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getSession} from '../../utils/util'

export default class PrivateRoute extends React.Component {
	render() {
		let {component: Component, num,path,routes} = this.props;
		return (
			<Route path={path} render={(props) => {
				let key=props.match.path.split('/')[num];
				let roles=getSession(key);
				key+='_search';
				if(!getSession('username')){
					return <Redirect to="/login"/>
				}else if(roles&&roles[key]){
					return (<Component {...props} routes={routes}/>)
				}else{
					return <Redirect to="/noAccess"/>
				}
			}

			}/>
		)
	}
}