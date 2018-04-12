import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTermState = {
	pageIndex: 1,
	pageSize: 10,
	traceStatus:2,
	beginTime: undefined,
	endTime: undefined,
	updateIds: [],
};
let trackTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.TRACK_SET_SEARCHTERM:
			return {
				...state,
				traceStatus: action.traceStatus,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.TRACK_SET_SEARCHPAGE:
			return {
				...state,
				pageSize: action.pageSize,
				pageIndex: action.pageIndex
			};
		case Types.TRACK_UPDATE:
			return {
				...state,
				updateIds: action.updateIds
			};
		default:
			return state;
	}
};

let initTableState = {
	details: [],
	count: 0,
};
let trackTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.TRACK_GET_TABLE:
			return {
				...state,
				details: action.details,
				count: action.count,
			};
		default:
			return state;
	}
};
export default {
	trackTableR,
	trackTermR
}