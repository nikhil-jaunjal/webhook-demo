const express = require('express');
const router = express.Router();
const user = require('../user');

router.post('/', function(req,res,next){
	res.send(req.body);
});

module.exports = router;