var express = require('express');
var router = express.Router();
const busControl = require('../controllers/busController');

router.get('/', busControl.all);
router.post('/', busControl.create);
router.get('/:id', busControl.byId);
router.put('/:id', busControl.put);
router.delete('/:id', busControl.remove);

module.exports = router;
