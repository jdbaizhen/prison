import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from "../../components/PrivateRoute/index";


export default class Track extends React.Component {
	render() {
		let {routes} = this.props;
		return (
			<Switch>
				{
					routes.map((route, i) => (
						<PrivateRoute {...route} key={i} num={i ? 2 : 1}/>
					))
				}
				<Route path="/track" render={props => (
					<Redirect to="/track/trackMain"/>
				)}/>
			</Switch>
		)
	}
}