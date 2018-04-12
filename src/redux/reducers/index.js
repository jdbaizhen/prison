import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';




import caseR from './case';
import caseTableR from './caseTable';
import trackR from './track';
import trackResultR from './trackResult';
import chartR from './chart';
import monitorR from './monitor';
import videoR from './video';
import synthesisR from './synthesis';
import userR from './user';
import roleR from './role';
import RegisterR from './register';



export default combineReducers({
	router:routerReducer,
	...trackResultR,
	...trackR,
	...caseTableR,
	...caseR,
	...chartR,
	...monitorR,
	...videoR,
	...synthesisR,
	...userR,
	...roleR,
	...RegisterR
})
