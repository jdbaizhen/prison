import * as types from '../action-types';
import {getTableDataA} from '../../api/synthesis';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		data.result=data.errCode==9999;
		data.message=data.errMsg;
		if (data.result) {
			let tableData=JSON.parse(data.data);
			dispatch({
				type: types.SYNTHESIS_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			dispatch({
				type:types.SYNTHESIS_SET_FLAG,
				flag:false
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchId = (id) => (dispatch) => {
	dispatch({
		type:types.SYNTHESIS_SET_SEARCHID,
		id:id,
	})
};
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.SYNTHESIS_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
		similar:terms.similar
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.SYNTHESIS_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};