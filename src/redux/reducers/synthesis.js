import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTermState = {
	id:undefined,
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
	similar:undefined,
	flag:true
};
let synthesisTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.SYNTHESIS_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				similar:undefined,
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.SYNTHESIS_SET_SEARCHTERM:
			return {
				...state,
				similar:action.similar,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.SYNTHESIS_SET_SEARCHPAGE:
			return {
				...state,
				pageSize: action.pageSize,
				pageIndex: action.pageIndex
			};
		case Types.SYNTHESIS_SET_FLAG:
			return {
				...state,
				flag:action.flag
			}
		default:
			return state;
	}
};


let initTableState = {
	details: [],
	count: 0
};

let synthesisTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.SYNTHESIS_GET_TABLE:
			return {...state,
				details:action.details,
				count:action.count
			};
		default:
			return state;
	}
};

export default {
	synthesisTableR,
	synthesisTermR
}