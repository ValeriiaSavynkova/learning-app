const express = require('express');
const {
  getTodayWordsHandler,
} = require('../controllers/getTodayWordsController');

const router = express.Router();

router.post('/', getTodayWordsHandler);

module.exports = router;
