const express = require('express');
const {
  decreaseReviewCountHandler,
} = require('../controllers/decreaseReviewCountController.js');

const router = express.Router();

router.post('/', decreaseReviewCountHandler);

module.exports = router;
