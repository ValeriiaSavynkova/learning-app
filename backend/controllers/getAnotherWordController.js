const { startService } = require('../mongo-service.js');

const getAnotherWordHandler = async (req, res) => {
  console.log('starting search another word service');
  console.log('Received words:', req.body.words);
  try {
    const { getNewWordsForDay, replaceWord, updateAlreadyKnownCount } =
      await startService();
    const word = await getNewWordsForDay(1, req.body.words, req.body.wordId);
    console.log('Word:', word);
    await replaceWord(word, req.body.index, req.body.date);
    await updateAlreadyKnownCount(req.body.date);
    res.send({ word: word, success: true });
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
  getAnotherWordHandler,
};
