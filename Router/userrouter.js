const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontrollers');
router.post('/add', usercontroller.signUp);
router.post('/login', usercontroller.login);
router.post('/reset', usercontroller.reset);
router.post('/forget', usercontroller.forget);
// router.delete('/delete/:id', usercontroller.deleteuser);

module.exports = router;
