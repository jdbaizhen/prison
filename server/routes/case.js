let express = require('express');
let router=express.Router();
let search=require('../mock/case.json');
let tableSearch=require('../mock/caseResult.json');
let oneCaseData=require('../mock/caseGetData.json');
router.post('/getModel',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理列表',
		total: 6,
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/deleteBatch',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/getById',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理查看',
		data:JSON.stringify(oneCaseData)
	};
	res.send(JSON.stringify(data));
});

router.post('/update',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理编辑'
	};
	res.send(JSON.stringify(data));
});

router.post('/getWarnInfos',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理告警信息列表',
		total: 5,
		data:JSON.stringify(tableSearch)
	};
	res.send(JSON.stringify(data));
});

module.exports=router;
