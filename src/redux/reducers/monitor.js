import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTableState = {
	details: {}
};
let monitorTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.MONITOR_GET_TABLE:
			return {
				...state,
				details: action.details
			};
		default:
			return state
	}
};


let initTermState = {
	updateIds: []
};
let monitorTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.MONITOR_UPDATE:
			return {
				...state,
				updateIds:action.updateIds
			};
		default:
			return state
	}
};

export default {
	monitorTableR,
	monitorTermR
}