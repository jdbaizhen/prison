import * as types from '../action-types';
import {getTableDataA, delTableDataA, getTimeDataA} from '../../api/trackResult';
import moment from 'moment';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			let tableData = JSON.parse(data.data);
			let searchNum = {
				similarity: tableData.targetSimilar,
				beginTime: tableData.startTime,
				endTime: tableData.endTime,
				targetSex:tableData.targetSex,
				targetAge:tableData.targetAge
			};
			dispatch({
				type: types.TRACKRESULT_GET_TABLE,
				crossingNum: tableData.totalModels,
				details: tableData.list,
				count: tableData.count,
				url: tableData.targetImgBase64,
				searchNum
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.TRACKRESULT_SET_SEARCHTERM,
		similarity: terms.similarity,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.TRACKRESULT_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (id,deleteIds) => (dispatch,getState) => (
	delTableDataA({traceId:id,ids:deleteIds}).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			dispatch({
				type: types.TRACKRESULT_UPDATE,
				updateIds: []
			});
			dispatch({
				type:types.TRACKRESULT_DEL_TIMEDATA,
				delIds:deleteIds
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let setSearchId = (id) => (dispatch) => {
	dispatch({
		type: types.TRACKRESULT_SET_SEARCHID,
		id,
	})
};

export let getTimeData = (terms) => (dispatch) => (
	getTimeDataA(terms).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		let timeData = JSON.parse(data.data);
		if (data.result) {
			dispatch({
				type: types.TRACKRESULT_GET_TIMEDATA,
				details: timeData.list
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);

