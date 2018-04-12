import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import {getTableDataA, delTableDataA, addTableDataA,getSeeDataA,editTableDataA} from '../../api/video';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData = JSON.parse(data.data);
			dispatch({
				type: types.VIDEO_GET_TABLE,
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
		type: types.VIDEO_SET_SEARCHTERM,
		task: terms.task,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.VIDEO_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (deleteIds) => (dispatch) => (
	delTableDataA([...deleteIds]).then(data => {
		if (data.result) {
			dispatch({
				type: types.VIDEO_UPDATE,
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
		if (data.result) {
			dispatch({
				type: types.VIDEO_UPDATE,
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
		if (data.result) {
			dispatch({
				type: types.VIDEO_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let getSeeData = (id) => (dispatch) => (
	getSeeDataA({id}).then(data => {
		if (data.result) {
			let tableData = JSON.parse(data.data);
			return {result: data.result,data:tableData};
		} else {
			return {result: false, err: data.message}
		}
	})
);
