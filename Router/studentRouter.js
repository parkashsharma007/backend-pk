const express = require('express');
const router = express.Router();
const controller = require('../Controllers/studentController');

router.post('/add', controller.add);
router.get('/all', controller.all);
router.get('/one/:id', controller.one);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
