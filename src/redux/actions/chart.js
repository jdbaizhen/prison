import * as types from '../action-types';
import {getTableDataA} from '../../api/chart';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			dispatch({
				type: types.CHART_GET_TABLE,
				details: tableData.series,
				xAxis:tableData.xAxis
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);

export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.CHART_SET_SEARCHTERM,
		road: terms.road,
		date: terms.date
	})
};