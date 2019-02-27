const express = require('express');
const router = express.Router();
const user = require('../user');

router.post('/', function(req,res,next){
    var userdata = new user(
		{ firstName :req.body.firstName,
		  lastName: req.body.lastName,
		  email : req.body.email
		});
	userdata.save(function (err, data) {
		res.send(data);
	});
});

module.exports = router;