const { startService } = require('../mongo-service.js');

const getFirstRenderHandler = async (req, res) => {
  console.log('starting getFirstRender service');
  try {
    console.log(req.body);
    const { getFirstRender } = await startService();
    const learnArray = await getFirstRender(req.body.date);
    console.log(learnArray.learn.length);
    console.log();
    const isFirstRender = learnArray?.learn?.length;
    console.log(isFirstRender);
    res.send({ isFirstRender: !isFirstRender });
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

module.exports = { getFirstRenderHandler };
