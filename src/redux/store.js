import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';

let history = createHistory();
import reducers from './reducers';

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
	reducers,
	composeEnhancers,
	applyMiddleware(
		reduxThunk,
		routerMiddleware(history)
	)
)