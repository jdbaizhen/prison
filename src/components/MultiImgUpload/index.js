import React from 'react';
import {Modal, Upload, Icon, Button} from 'antd';

export default class MultiImgUpload extends React.Component {
	uploadAdd = (file, fileList) => {
		let {uploadList, getImgData, limit, maxSize} = this.props;
		let size = Math.floor(file.size / 1024);
		if (maxSize&&size > maxSize) {
			Modal.error({
				title: '图片太大',
				content: `请上传小于${maxSize}KB大小的图片`
			})
		} else if (limit>1&&uploadList.length + fileList.length > limit) {
			Modal.error({
				title: `最多上传${limit}张图片`,
				content: '请重新选择'
			})
		} else {
			let _this = this;
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				let obj = {};
				obj.name = file.name;
				obj.url = this.result;
				obj.uid = file.uid;
				obj.size = file.size;
				obj.status = 'done';
				if(limit===1){
					getImgData([obj]);
				}else{
					getImgData([..._this.props.uploadList, obj]);
				}
			}
		}
		return false;
	};
	uploadDel = (file) => {
		let {uploadList, getImgData} = this.props;
		let newData = uploadList.filter(item => item !== file);
		getImgData(newData);
	};

	render() {
		let {uploadList, disable, limit} = this.props;
		let imgProps = {
			name: 'file',
			action: '',
			beforeUpload: this.uploadAdd,
			onRemove: this.uploadDel,
			listType: "picture-card",
			fileList: uploadList,
			disabled: disable,
			multiple: limit > 1||typeof limit==='undefined',
			showUploadList: {
				showRemoveIcon: !disable
			}
		};
		return (
			<Upload {...imgProps}>
				<div style={{width: '86px', height: '86px', padding: '8px', fontSize: '40px'}} className="my-upload">
					<Icon type={limit===1&&uploadList && uploadList.length ? 'edit' : 'plus'}/>
				</div>
			</Upload>
		)
	}
}
import './index.less'