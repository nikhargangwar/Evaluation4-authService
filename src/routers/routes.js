const express = require('express');
const router  = express.Router();
const authControllers = require('../controllers/authControllers');

router.post('/user',authControllers.addNewUser);
router.post('/login',authControllers.loginUser);
router.get('/verify',authControllers.verifyToken);

module.exports = router;