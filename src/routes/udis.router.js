const { Router } = require('express');
const { udisCreate } = require('../controllers/udis.controller');

const router = Router();

router.get('/', (req, res) =>{
    res.status(200).json({msg: 'Ok from router'})
});

router.post('/', udisCreate);


module.exports = router;
