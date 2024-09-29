const express = require('express');
const newWordsRouter = require('./newWords.js');
const anotherWordRouter = require('./anotherWord.js');
const addWordRouter = require('./addWord.js');
const reviewWordsRouter = require('./review.js');
const updateReviewRouter = require('./updateReview.js');
const firstRenderRouter = require('./firstRender.js');
const todayWordsRouter = require('./todayWords.js');
const todayCountsRouter = require('./todayCounts.js');
const decreaseReviewCountRouter = require('./decreaseReviewCount.js');
const router = express.Router();

router.use('/api/new-words', newWordsRouter);
router.use('/api/anotherword', anotherWordRouter);
router.use('/api/word', addWordRouter);
router.use('/api/review', reviewWordsRouter);
router.use('/api/review-update', updateReviewRouter);
router.use('/api/first-render', firstRenderRouter);
router.use('/api/today-words', todayWordsRouter);
router.use('/api/today-counts', todayCountsRouter);
router.use('/api/reviewcount-decrease', decreaseReviewCountRouter);

module.exports = router;
