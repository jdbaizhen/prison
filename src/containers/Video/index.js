import React from 'react';
import {Layout} from 'antd';
import {Route, Switch,Redirect} from 'react-router-dom';
import PrivateRoute from "../../components/PrivateRoute/index";

export default class Video extends React.Component{
    render(){
	    let {routes} = this.props;
        return(
                <Switch>
		            {
			            routes.map((route, i) => (
                            <PrivateRoute {...route} key={i} num={i?2:1}/>
			            ))
		            }
                    <Route path="/video" render={props => (
                        <Redirect to="/video/videoMain"/>
		            )}/>
                </Switch>
        )
    }
}