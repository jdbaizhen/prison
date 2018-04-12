import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';

let initTermState = {
	treeNodes: [],
	date: undefined,
	dataType:'日',
	type : '1'
};
let chartTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.CHART_SET_SEARCHTERM:
			return {
				...state,
				treeNodes: action.road,
				date: action.date,
				dataType:action.dataType
			};
		default:
			return state;
	}
};
let initTableState = {
	details: [],
	xAxis:[]
};
let chartTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.CHART_GET_TABLE:
			return {...state,
				details:action.details,
				xAxis:action.xAxis
			};
		default:
			return state;
	}
};
export default {
	chartTableR,
	chartTermR
}