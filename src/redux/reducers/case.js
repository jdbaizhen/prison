import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTermState = {
	pageIndex: 1,
	pageSize: 10,
	caseName: undefined,
	principal: undefined,
	beginTime: undefined,
	endTime: undefined,
	updateIds: [],

};
let caseTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.CASE_SET_SEARCHTERM:
			return {
				...state,
				caseName: action.caseName,
				principal: action.principal,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.CASE_SET_SEARCHPAGE:
			return {
				...state,
				pageSize: action.pageSize,
				pageIndex: action.pageIndex
			};
		case Types.CASE_UPDATE:
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

let caseTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.CASE_GET_TABLE:
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
	caseTableR,
	caseTermR
}