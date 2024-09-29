const { startService } = require('../mongo-service.js');

const decreaseReviewCountHandler = async (req, res) => {
  try {
    const { decreaseReviewCount } = await startService();
    await decreaseReviewCount(req.body.word);
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

module.exports = { decreaseReviewCountHandler };
