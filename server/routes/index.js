const express = require('express');
const router = express.Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));
router.use('/comments', require('./comments'));
router.use('/auth', require('./auth'));
router.use('/google', require('./oauthGoogle'));
router.use('/edamam', require('./edamam'));
