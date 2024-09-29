const { startService } = require('../mongo-service.js');

const getTodayCountsHandler = async (req, res) => {
  console.log('Get memorized words count');
  try {
    const { getMemorizedWordsCount, getReviewWords } = await startService();
    const wordsCount = await getMemorizedWordsCount(req.body.date);
    console.log('newWordsMemorized: ', wordsCount);
    const words = await getReviewWords(req.body.currentDate);
    console.log(words);
    const reviewedCount = words.length;
    res.send({ newWordsMemorized: wordsCount, reviewedCount: reviewedCount });
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

module.exports = { getTodayCountsHandler };
