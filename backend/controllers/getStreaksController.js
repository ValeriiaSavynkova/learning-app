const { startService } = require('../mongo-service.js');
const { todayDate } = require('../config/config.js');

const date = todayDate();
const getStreaksHandler = async (req, res) => {
  console.log('starting getStreaks service');
  try {
    console.log('try start');
    const { getStreaks } = await startService();
    const statisticsArray = await getStreaks();
    const statisticsDates = statisticsArray.statistics
      .filter((statistic) => statistic.newWordsMemorized > 0)
      .map((statistic) => statistic.date)
      .sort((a, b) => b - a);
    console.log(statisticsDates);
    let currentStreak = 0;
    let bestStreak = 0;
    for (let i = 0; i < statisticsDates.length - 1; i++) {
      if (statisticsDates[i] - statisticsDates[i + 1] === 86400000) {
        // разница между днями 24 часа
        currentStreak++;
      } else {
        break;
      }
    }
    let tempStreak = 0;

    for (let i = 0; i < statisticsDates.length - 1; i++) {
      if (statisticsDates[i] - statisticsDates[i + 1] === 86400000) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    console.log(currentStreak, bestStreak);

    res.send({ currentStreak, bestStreak });
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
  getStreaksHandler,
};
