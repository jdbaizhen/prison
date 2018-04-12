let express = require('express');
let router = express.Router();
let monitor=require('../mock/monitor.json');
let ipc=require('../mock/ipc.json');

router.get('/search', function (req, res) {
	let data = {
		result: true,
		message: '获取摄像头数据成功',
		data: JSON.stringify(monitor)
	};

	res.send(JSON.stringify(data));
});
router.post('/delete',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '摄像头删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '摄像头添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/get',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '摄像头查看',
		data:JSON.stringify(ipc)
	};
	res.send(JSON.stringify(data));
});

router.post('/edit',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '摄像头编辑'
	};
	res.send(JSON.stringify(data));
});
module.exports = router;