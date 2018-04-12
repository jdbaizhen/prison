import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Redirect,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import createHistoty from 'history/createHashHistory';
let history=createHistoty();
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import store from './redux/store';
import {getSession} from './utils/util';
import './common/main.less';
import routes from './router';
import Main from "./containers/Main";
import PrivateRoute from "./components/PrivateRoute/index";

import webVideoCtrl from './common/webVideoCtrl';
webVideoCtrl(window);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<LocaleProvider locale={zhCN}>
				<Main>
					<Switch>
					{
						routes.map((route,i)=>{
							if(route.path==='/'){
								return <Route path="/" exact key={i} render={props=>(
									getSession('username')? <Redirect to="/map"/>:<Redirect to="/login"/>
									)}/>
							}else if(route.path==='/login'||route.path==='/noAccess'){
								return <Route path={route.path} {...route.props} key={i} render={props=>(
									<route.component {...props} routes={route.routes}/>
									)}/>
							}else{
								return <PrivateRoute {...route} key={i} num={1}/>
							}
						})
					}
					</Switch>
				</Main>
			</LocaleProvider>
		</ConnectedRouter>
	</Provider>,document.getElementById('root'));