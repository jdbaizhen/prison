import * as types from '../action-types';
import {getModalTableDataA} from '../../api/case';

export let getTableData = (searchTerm) => (dispatch) => (
	getModalTableDataA(searchTerm).then(data => {
		if (data.errCode==='9999') {
			let tableData = data.data;
            dispatch({
				type: types.CASETABLE_GET_TABLE,
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
		type: types.CASETABLE_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.CASETABLE_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};