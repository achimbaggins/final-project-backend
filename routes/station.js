var express = require('express');
var router = express.Router();
const stationControl = require('../controllers/stationController');

router.get('/', stationControl.all);

module.exports = router;
