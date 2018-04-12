import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
let initTermState = {
	id:undefined,
	similarity:undefined,
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
	updateIds: []
};
let trackResultTermR=(state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.TRACKRESULT_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				similarity:undefined,
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.TRACKRESULT_SET_SEARCHTERM:
			return {
				...state,
				similarity:action.similarity,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.TRACKRESULT_SET_SEARCHPAGE:
			return {
				...state,
				pageSize:action.pageSize,
				pageIndex:action.pageIndex
			};
		case Types.TRACKRESULT_UPDATE:
			return {
				...state,
				updateIds: action.updateIds
			};
		default:
			return state;
	}
};

let initTableState = {
	crossingNum:[],
	details: [],
	url:undefined,
	searchNum:{},
	count: 0,
};
let trackResultTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.TRACKRESULT_GET_TABLE:
			return {...state,
				crossingNum:action.crossingNum,
				details:action.details,
				count:action.count,
				url:action.url,
				searchNum:action.searchNum,
			};
		default:
			return state;
	}
};

let initTimeState={
	count:0,
	details: [],
};
let trackResultTimeR=(state=cloneDeep(initTimeState),action)=>{
	switch (action.type) {
		case Types.TRACKRESULT_GET_TIMEDATA:
			console.log(action);
			return {...state,
				count:state.count+action.details.length,
				details:[...state.details,...action.details]
			};
		case Types.TRACKRESULT_DEL_TIMEDATA:

			let newDetail=state.details.filter(item=>action.delIds.indexOf(item.traceDiscernId)<0);
			return {
				...state,
				details:newDetail,
				count:newDetail.length
			};
		default:
			return state;
	}
};
export default {
	trackResultTableR,
	trackResultTermR,
	trackResultTimeR
}