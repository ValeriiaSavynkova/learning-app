const express = require('express');
const {
  postReviewUpdateHandler,
} = require('../controllers/postReviewUpdateController');

const router = express.Router();

router.post('/', postReviewUpdateHandler);

module.exports = router;
