import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/monitor';
import {Map, ImageOverlay, ZoomControl} from 'react-leaflet';
import L from 'leaflet';
// import LIcon from 'leaflet/dist/images/'
// L.Icon.Default.imagePath =LIcon;

import {Layout} from 'antd';
let {Content} = Layout;
import mapImg from '../../../common/images/map.jpg';

class MonitorMap extends React.Component {
	componentDidMount() {
	}

	render() {
		let {handleAdd, handleEdit} = this.props;
		let mapProps = {
			ref: 'map',
			crs: L.CRS.Simple,
			attributionControl: false,
			zoomDelta: 0.5,
			zoomSnap: 0,
			bounds: [[-1920, 0], [0, 5680]],
			maxBounds: [[-1920 * 2, -5680], [1920, 5680 * 2]],
			minZoom: -2,
			maxZoom: 2,
			style: {width: '100%', height: '100%'}
		}

		return (
			<Content>
				<button onClick={handleAdd}>增</button>
				<button>删</button>
				<button onClick={() => {
					handleEdit(35, true)
				}}>改
				</button>
				<button onClick={() => {
					handleEdit(35, false)
				}}>查
				</button>
				{/*<Map {...mapProps}>*/}
					{/*<ImageOverlay url={mapImg} bounds={[[-1920, 0], [0, 5680]]}/>*/}
				{/*</Map>*/}

			</Content>
		)
	}
}
import 'leaflet/dist/leaflet.css';
export default connect(
	state=>({...state.monitorTableR}),
	action
)(MonitorMap)