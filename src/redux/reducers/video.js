import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTermState = {
	pageIndex: 1,
	pageSize: 10,
	task:undefined,
	beginTime: undefined,
	endTime: undefined,
	updateIds: [],
};
let videoTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.VIDEO_SET_SEARCHTERM:
			return {
				...state,
				task: action.task,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.VIDEO_SET_SEARCHPAGE:
			return {
				...state,
				pageSize: action.pageSize,
				pageIndex: action.pageIndex
			};
		case Types.VIDEO_UPDATE:
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
let videoTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.VIDEO_GET_TABLE:
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
	videoTableR,
	videoTermR
}