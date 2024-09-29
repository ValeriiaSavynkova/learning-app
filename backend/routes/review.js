const express = require('express');
const {
  getReviewWordsHandler,
} = require('../controllers/getReviewWordsController');

const router = express.Router();

router.post('/', getReviewWordsHandler);

module.exports = router;
