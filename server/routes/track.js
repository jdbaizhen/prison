let express = require('express');
let router=express.Router();
let search=require('../mock/track.json');
let getData=require('../mock/trackGetData.json');
router.post('/getByModel',function (req,res) {
	let data = {
		errCode:9999,
		errMsg: '追查行踪列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/deleteBatch',function (req,res) {
	let data = {
		errCode:9999,
		errMsg: '追查行踪删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	let data = {
		errCode:9999,
		errMsg: '追查行踪添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/getDetails',function (req,res) {
	console.log(req.body);
	let data = {
		errCode:9999,
		errMsg: '追查行踪查看',
		data:JSON.stringify(getData)
	};
	res.send(JSON.stringify(data));
});

router.post('/update',function (req,res) {
	console.log(req.body);
	let data = {
		errCode:9999,
		errMsg: '追查行踪编辑'
	};
	res.send(JSON.stringify(data));
});
module.exports=router;

