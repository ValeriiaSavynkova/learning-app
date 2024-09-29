const { startService } = require('../mongo-service.js');

const postWordToCollectionHandler = async (req, res) => {
  console.log('Add a word to user DB');
  console.log(req.body.word);
  console.log(req.body.date);

  try {
    const { addWordToCollectionToUser } = await startService();
    await addWordToCollectionToUser(req.body.word, req.body.date);
    console.log('Word added to user DB');
    res.send({ added: true });
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
  postWordToCollectionHandler,
};
