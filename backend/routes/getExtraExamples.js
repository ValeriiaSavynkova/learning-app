const express = require('express');
const {
  getNewExamplesHandler,
} = require('../controllers/getNewExamplesController');

const router = express.Router();

router.post('/', getNewExamplesHandler);

module.exports = router;
