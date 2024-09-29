const { startService } = require('../mongo-service.js');

const postReviewUpdateHandler = async (req, res) => {
  console.log('Update a word to user DB');
  console.log(req.body.word);

  try {
    const { updateReviewWord, updateReviewedCount } = await startService();
    const result = await updateReviewWord(req.body.word);
    console.log('Word updated to user DB', result);
    await updateReviewedCount(req.body.word.lastReviewedAt);
    res.send({ updated: true });
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
  postReviewUpdateHandler,
};
