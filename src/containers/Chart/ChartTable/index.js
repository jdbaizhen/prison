import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';

import {connect} from 'react-redux';
import * as action from "../../../redux/actions/chart";

class ChartTable extends React.Component {
	constructor(){
		super();
		this.state={
			chart:undefined
		}
	}
	componentDidMount() {
		let {details, getData} = this.props;
		if (!details.length) {
			getData();
		}
		let myPie = echarts.init(document.getElementById('chart'));
		this.setState({
			chart:myPie
		});
		setTimeout(function () {
			myPie.resize();
		}, 0);
		window.addEventListener('resize', function () {
			myPie.resize();
		});
	}

	render() {
		let {road, date, details,xAxis} = this.props;
		let ary = date?date.split('-'):[];
		let option = {
			animation:true,
			title: {
				left: 'center',
				top: 0,
				text: `${ary[0]?ary[0]+'年':''}${ary[1]?ary[1]+'月':''}${ary[2]?ary[2]+'日':''} `,
				textStyle:{
					fontSize:23,
					lineHeight:23
				},
				subtext: "各摄像头人流数据统计",
				subtextStyle:{
					fontSize:18,
					color:'#888',
					lineHeight:25
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				animation:true,
				left: 'center',
				bottom: 0,
				data: details.map(item => item.ipc),
				textStyle:{
					fontSize:15
				}
			},
			toolbox: {
				itemSize: 20,
				top: 0,
				right: '4%',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},

					magicType: {type: ['line', 'bar','stack', 'tiled']},
					restore: {},
					saveAsImage: {}
				}
			},
			grid: {
				top:'10%',
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: xAxis
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: details.map(item => (
				{
					type: 'line',
					// stack: '总量',
					areaStyle: {normal: {}},
					smooth: true,
					name: item.ipc,
					data: item.data,
					// markPoint: {
					// 	data: [
					// 		{type: 'max', name: '最大值'},
					// 		{type: 'min', name: '最小值'}
					// 	]
					// },
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}
				}
			))
		};
		if(details.length&&this.state.chart){
			this.state.chart.setOption(option);
		}
		return (
			<div ref="chartBox" style={{
				backgroundColor: 'transparent',
				display: 'flex',
				flexDirection: 'column',
				flex: '1 1 auto'
			}} id="chart"/>
		)
	}
}

export default connect(
	state => ({...state.chartTableR}),
	action
)(ChartTable);