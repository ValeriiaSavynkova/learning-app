const express = require('express');
const {
  getAnotherWordHandler,
} = require('../controllers/getAnotherWordController');

const router = express.Router();

router.post('/', getAnotherWordHandler);

module.exports = router;
