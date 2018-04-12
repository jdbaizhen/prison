import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import {getTableDataA, delTableDataA, addTableDataA, getSeeDataA, editTableDataA} from '../../api/monitor';

export let clearTableData = () => (dispatch) => (
	dispatch({
		type: types.MONITOR_GET_TABLE,
		details: []
	})
);
export let getTableData = () => (dispatch) => (
	getTableDataA().then(data => {
		if (data.result) {
			let tableData =JSON.parse(data.data);
            dispatch({
				type: types.MONITOR_GET_TABLE,
				details: tableData
			});
			dispatch({
				type: types.SYNTHESIS_SET_SEARCHID,
				id: tableData.all[0].reginChild[0].cameraInfo[0].value
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let delTableData = (deleteIds,type) => (dispatch) => (
	delTableDataA({id: deleteIds,deviceType:type}).then(data => {
		if (data.result) {
			dispatch({
				type: types.MONITOR_UPDATE,
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
				type: types.MONITOR_UPDATE,
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
				type: types.MONITOR_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let getSeeData = (id,type) => (dispatch) => (
	getSeeDataA({id,deviceType:type}).then(data => {
		if (data.result) {
			let tableData = JSON.parse(data.data);
			return {result: data.result, data: tableData};
		} else {
			return {result: false, err: data.message}
		}
	})
);