const dotenv = require('dotenv');

dotenv.config();

const { startService } = require('./mongo-service.js');

const main = async () => {
  try {
    const {
      addWord,
      getWords,
      updateWord,
      deleteWords,
      deleteResetWords,
      getNewWordsForDay,
      getFirstRender,
      getReviewWords,
      getMemorizedWordsCount,
    } = await startService();
    // console.log(await getFirstRender(1725055200000));
    //await updateWord('669f8942d5d4353cfed8ce4d', {
    //   meaning: 'to begin something',
    // });

    //   const words = await getWords();

    console.log(await getMemorizedWordsCount(1725746400000));

    //console.log((await getReviewWords(1725746400000)).length);

    // await addWord({
    //   word: 'sky',
    //   meaning: 'the space above the Earth',
    // });

    //await getWords();

    //await deleteWords();

    //await deleteResetWords();

    // const words = await getNewWordsForDay(5);
    // console.log(words);
  } catch (error) {
    console.error(error);
  }
};

main();
