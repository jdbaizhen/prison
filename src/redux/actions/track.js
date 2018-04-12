import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import {getTableDataA, delTableDataA, addTableDataA,getSeeDataA,editTableDataA} from '../../api/track';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			let tableData = JSON.parse(data.data);
			dispatch({
				type: types.TRACK_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.TRACK_SET_SEARCHTERM,
		traceStatus: terms.traceStatus,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.TRACK_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (deleteIds) => (dispatch) => (
	delTableDataA({ids:[...deleteIds]}).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {

			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let addTableData = (obj) => (dispatch) => (
	addTableDataA(cloneDeep(obj)).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let editTableData = (obj) => (dispatch) => (
	editTableDataA(cloneDeep(obj)).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let getSeeData = (id) => (dispatch) => (
	getSeeDataA({traceId:id}).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
	if (data.result) {
		let tableData = JSON.parse(data.data);
		return {result: data.result,data:tableData};
	} else {
		return {result: false, err: data.message}
	}
})
);
