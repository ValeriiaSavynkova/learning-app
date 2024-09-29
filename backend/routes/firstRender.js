const express = require('express');
const {
  getFirstRenderHandler,
} = require('../controllers/getFirstRenderController');

const router = express.Router();

router.post('/', getFirstRenderHandler);

module.exports = router;
