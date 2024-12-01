const { startService } = require('../mongo-service.js');

const getTodayWordsHandler = async (req, res) => {
  console.log('starting getTodayWords service');
  try {
    const { getFirstRender, getMemorizedWordsCount } = await startService();
    const words = await getFirstRender(req.body.date);
    console.log(words);
    // console.log(words.learn);
    const currentIndex = await getMemorizedWordsCount(req.body.date);
    //  console.log(currentIndex);
    res.send({ words: words.learn, currentIndex: currentIndex });
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

module.exports = { getTodayWordsHandler };
