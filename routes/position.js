var express = require('express');
var router = express.Router();
const positionControl = require('../controllers/positionController');

router.get('/', positionControl.all);
router.post('/', positionControl.create);
// router.get('/:id', positionControl.byId);
// router.put('/:id', positionControl.put);
// router.delete('/:id', positionControl.remove);

module.exports = router;
