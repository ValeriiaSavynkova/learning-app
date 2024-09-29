const express = require('express');
const {
  getTodayCountsHandler,
} = require('../controllers/getTodayCountsController.js');

const router = express.Router();

router.post('/', getTodayCountsHandler);

module.exports = router;
