import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
let initTermState = {
	id:undefined,
	info:{},
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
};
let caseTableTermR=(state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.CASETABLE_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				info:cloneDeep(action.info),
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.CASETABLE_SET_SEARCHTERM:
			return {
				...state,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.CASETABLE_SET_SEARCHPAGE:
			return {
				...state,
				pageSize:action.pageSize,
				pageIndex:action.pageIndex
			};
		default:
			return state;
	}
};
let initTableState = {
	details: {
		listData:[]
	},
	count: 0,
};
let caseTableTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.CASETABLE_GET_TABLE:
			return {...state,
				details:action.details,
				count:action.count,
			};
		default:
			return state;
	}
};
export default {
	caseTableTableR,
	caseTableTermR
}