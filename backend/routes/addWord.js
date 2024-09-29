const express = require('express');
const {
  postWordToCollectionHandler,
} = require('../controllers/postWordToCollectionController');

const router = express.Router();

router.post('/', postWordToCollectionHandler);

module.exports = router;
