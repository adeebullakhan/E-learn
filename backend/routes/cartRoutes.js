const express = require('express');
const router = express.Router();
const { getCartWithDetails } = require('../controllers/cartController');

router.get('/:userId', getCartWithDetails);

module.exports = router;
