let express = require('express');
let router = express.Router();
let video=require('../mock/video.json');
let videoGetData=require('../mock/videoGetData.json');
let videoResult=require('../mock/videoReault.json');

router.post('/search', function (req, res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '获取视频解析数据成功',
		data: JSON.stringify(video)
	};

	res.send(JSON.stringify(data));
});
router.post('/delete',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '视频解析删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '视频解析添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/get',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '视频解析查看',
		data:JSON.stringify(videoGetData)
	};
	res.send(JSON.stringify(data));
});

router.post('/edit',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '视频解析编辑'
	};
	res.send(JSON.stringify(data));
});
router.post('/result',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '视频解析编辑',
		data:JSON.stringify(videoResult)
	};
	res.send(JSON.stringify(data));
});
module.exports = router;