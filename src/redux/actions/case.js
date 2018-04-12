import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import {getTableDataA, delTableDataA, addTableDataA, getSeeDataA, editTableDataA} from '../../api/case';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		if (data.errCode==='9999') {
			let tableData = JSON.parse(data.data);
			dispatch({
				type: types.CASE_GET_TABLE,
				details: tableData,
				count: data.total
			});
			return {result: data.errCode}
		} else {
			return {result: data.errCode, err: data.errMsg}
		}
	})
);

export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.CASE_SET_SEARCHTERM,
		caseName: terms.caseName,
		principal: terms.principal,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.CASE_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (deleteIds) => (dispatch) => (
	delTableDataA({ids: [...deleteIds]}).then(data => {
		if (data.errCode==='9999') {
			dispatch({
				type: types.CASE_UPDATE,
				updateIds: []
			});
			return {result: data.errCode};
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);

export let addTableData = (obj) => (dispatch) => (
	addTableDataA(cloneDeep(obj)).then(data => {
		if (data.errCode==='9999') {
			dispatch({
				type: types.CASE_UPDATE,
				updateIds: []
			});
			return {result: data.errCode};
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);
export let editTableData = (obj) => (dispatch) => (
	editTableDataA(cloneDeep(obj)).then(data => {
		if (data.errCode==='9999') {
			dispatch({
				type: types.CASE_UPDATE,
				updateIds: []
			});
			return {result: data.errCode};
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);
export let getSeeData = (id) => (dispatch) => (
	getSeeDataA({caseId: id}).then(data => {
		if (data.errCode==='9999') {
            console.log(data.data);
            let tableData = data.data;
			return {result: data.errCode, data: tableData};
		} else {
			return {result: false, err: data.errMsg}
		}
	})
);
export let setSearchId = ({id, info}) => (dispatch) => {
	dispatch({
		type: types.CASETABLE_SET_SEARCHID,
		id,
		info
	})
};
