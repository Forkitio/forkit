const express = require('express');
const router = express.Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));
router.use('/comments', require('./comments'));
router.use('/auth', require('./auth'));
router.use('/pinterest', require('./oauthPinterest'));

