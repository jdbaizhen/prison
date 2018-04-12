import React from 'react';
import {Modal, Form, Button} from 'antd';

export default class MyModalForm extends React.Component {


	render() {
		let {flag, title, footer, handleCancel, handleSubmit, handleReset, loading, width,myStyle} = this.props;
		return (
			<Modal
				bodyStyle={{
					backgroundColor: '#ECECEC'
				}}
				style={{...myStyle}}
				width={width}
				visible={flag}
				title={title}
				footer={footer ? (
					<div>
						<Button
							type="primary"
							icon="check"
							onClick={handleSubmit}
							style={{margin: '0 2px'}}
							loading={loading}
						>
							提交
						</Button>
						<Button
							onClick={handleReset}
							style={{margin: '0 2px'}}
						>
							重置
						</Button>
					</div>
				) : null}
				maskClosable={false}
				onCancel={handleCancel}
			>

					<Form>
						{this.props.children}
					</Form>
			</Modal>
		)
	}
}