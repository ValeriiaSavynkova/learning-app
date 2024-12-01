const express = require('express');
const { getStreaksHandler } = require('../controllers/getStreaksController.js');

const router = express.Router();

router.get('/', getStreaksHandler);

module.exports = router;
