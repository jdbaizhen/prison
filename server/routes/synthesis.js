let express = require('express');
let router = express.Router();
let synthesis=require('../mock/synthesis.json');
router.post('/getByModel', function (req, res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '获取视频解析数据成功',
		data: JSON.stringify(synthesis)
	};

	res.send(JSON.stringify(data));
});
module.exports = router;