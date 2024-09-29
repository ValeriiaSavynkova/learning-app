const express = require('express');
const {
  getNewWordsForDayHandler,
} = require('../controllers/getNewWordsForDayController');

const router = express.Router();

router.post('/', getNewWordsForDayHandler);

module.exports = router;
