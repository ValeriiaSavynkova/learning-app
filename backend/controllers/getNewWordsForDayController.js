const { startService } = require('../mongo-service.js');

const getNewWordsForDayHandler = async (req, res) => {
  console.log('starting 5 new words service');
  try {
    console.log('try start');
    const { getNewWordsForDay, addTodayWords } = await startService();
    const words = await getNewWordsForDay(5);
    console.log(words);
    const result = await addTodayWords(words, req.body.date);
    console.log('addTodayWords: ', result);
    res.send(words);
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
  getNewWordsForDayHandler,
};
