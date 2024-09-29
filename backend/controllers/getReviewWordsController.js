const { startService } = require('../mongo-service.js');

const getReviewWordsHandler = async (req, res) => {
  console.log('getReviewWordsHandler');
  try {
    const { getReviewWords, getReviewForDayCount, getReviewedWordsCount } =
      await startService();
    const words = await getReviewWords(req.body.currentDate);
    const reviewForDayCount = (await getReviewForDayCount(req.body.currentDate))
      .review;
    const reviewedCount = await getReviewedWordsCount(req.body.currentDate);
    console.log(words);
    res.send({
      words: words,
      reviewedCount: reviewedCount,
      reviewForDayCount: reviewForDayCount,
    });
  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      res.status(503).send({
        error:
          'Sorry, the external currency API is currently unavailable. Please try again later.',
      });
    }
  }
};

module.exports = {
  getReviewWordsHandler,
};
