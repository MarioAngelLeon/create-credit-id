const { Router } = require('express');
const { udisCreate, udisGet } = require('../controllers/udis.controller');

const router = Router();

router.get('/:date', udisGet);

router.post('/', udisCreate);


module.exports = router;
