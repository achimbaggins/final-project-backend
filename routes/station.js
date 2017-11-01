var express = require('express');
var router = express.Router();
const stationControl = require('../controllers/stationController');

router.get('/', stationControl.all);
router.post('/', stationControl.create);
router.get('/:id', stationControl.byId);
router.put('/:id', stationControl.put);
router.delete('/:id', stationControl.remove);

module.exports = router;
