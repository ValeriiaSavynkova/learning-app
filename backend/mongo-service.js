const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hnfmnry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};
const client = new MongoClient(uri, options);

const startService = async () => {
  await client.connect();
  return {
    addWord,
    addManyWords,
    getWords,
    deleteWord,
    updateWord,
    getNewWordsForDay,
    addWordToCollectionToUser,
    deleteWords,
    deleteResetWords,
    getReviewWords,
    updateReviewWord,
    getFirstRender,
    addTodayWords,
    replaceWord,
    getMemorizedWordsCount,
    updateAlreadyKnownCount,
    updateStatistics,
    getReviewedWordsCount,
    updateReviewedCount,
    addNewDay,
    deleteYesterday,
    getReviewForDayCount,
    decreaseReviewCount,
    getStreaks,
    // updateToday,
  };
};

const wordsCollection = client.db('learning-app').collection('words');
const user1Collection = client.db('learning-app').collection('user1');

const addWord = async (word) => {
  const { insertedId: id } = await wordsCollection.insertOne(word);
  return id;
};

const addManyWords = async (words) => {
  for await (const wordData of words) {
    const { word, form, meaning, examples } = wordData;

    if (!word || !meaning || !Array.isArray(examples)) {
      console.error('Invalid word data:', wordData);
      continue;
    }

    await wordsCollection.insertOne({
      word: word,
      form: form,
      meaning: meaning,
      examples: examples,
    });
  }
  console.log('done');
};
const addWordToCollectionToUser = async (word, date) => {
  await user1Collection.insertOne(word);
  await user1Collection.updateOne(
    { 'statistics.date': date }, // Поиск объекта с указанной датой
    {
      $inc: { 'statistics.$.newWordsMemorized': 1 }, // Увеличение значения newWordsMemorized на 1
    }
  );
  await user1Collection.updateOne(
    {
      date: date,
      learn: { $exists: true },
      review: { $exists: true },
    },
    {
      $inc: { review: 1 },
    }
  );
};

const getWords = async () => {
  return await wordsCollection.find().toArray();
};

const getStreaks = async () => {
  return await user1Collection.findOne(
    { statistics: { $exists: true } },
    { projection: { _id: 0 } }
  );
};

// it is also used in getTodayWordsHandler
const getFirstRender = async (date) => {
  return await user1Collection.findOne(
    { date: date }, // Находим документ по полю date
    { projection: { learn: 1, _id: 0 } } // Получаем только поле learn, исключая _id
  );
};

// it is also used in getMemorizedWordsCountHandler
const getMemorizedWordsCount = async (date) => {
  const result = await user1Collection.findOne(
    { statistics: { $elemMatch: { date: date } } }, // Поиск объекта с указанной датой
    { projection: { 'statistics.$': 1 } }
  ); // Возвращаем только массив statistics с найденным объектом

  if (!result || !result.statistics || result.statistics.length === 0) {
    console.log("Document didn't find");
    return 0;
  }

  return result.statistics[0].newWordsMemorized;
};

const getReviewedWordsCount = async (date) => {
  const result = await user1Collection.findOne(
    { statistics: { $elemMatch: { date: date } } }, // Поиск объекта с указанной датой
    { projection: { 'statistics.$': 1 } }
  ); // Возвращаем только массив statistics с найденным объектом

  return result.statistics[0].reviewed;
};

const addTodayWords = async (words, date) => {
  console.log(`Checking if the array 'learn' for date ${date} is empty.`);

  const document = await user1Collection.findOne({
    date: date,
    $expr: { $eq: [{ $size: '$learn' }, 0] }, // Проверяем, что длина массива learn равна 0
  });

  if (document) {
    console.log(
      `Field 'learn' is empty for date ${date}. Adding words to 'learn'.`
    );

    return await user1Collection.updateOne(
      { date: date },
      { $set: { learn: words } }
    );
  } else {
    console.log(
      `Field 'learn' is not empty or does not exist for date ${date}. No changes made.`
    );
    return 'No changes made';
  }
};

const replaceWord = async (word, index, date) => {
  await user1Collection.updateOne(
    {
      date: date,
      learn: { $exists: true },
      review: { $exists: true },
    },
    {
      $set: {
        [`learn.${index}`]: word,
      },
    }
  );
};

const updateAlreadyKnownCount = async (date) => {
  await user1Collection.updateOne(
    { statistics: { $elemMatch: { date: date } } }, // Поиск объекта с указанной датой
    {
      $inc: { 'statistics.$.alreadyKnown': 1 }, // Увеличение значения newWordsMemorized на 1
    }
  );
};

const updateReviewedCount = async (date) => {
  await user1Collection.updateOne(
    { statistics: { $elemMatch: { date: date } } }, // Поиск объекта с указанной датой
    {
      $inc: { 'statistics.$.reviewed': 1 }, // Увеличение значения reviewed на 1
    }
  );
};

const updateStatistics = async (date) => {
  await user1Collection.updateOne(
    { statistics: { $exists: true } },
    {
      $push: {
        statistics: {
          date: date,
          newWordsMemorized: 0,
          reviewed: 0,
          mastered: 0,
          alreadyKnown: 0,
        },
      },
    }
  );
};

// const updateToday = async (date, reviewedCount) => {
//   await user1Collection.updateOne(
//     { date: date, review: 0 },
//     { $set: { review: reviewedCount } }
//   );
// };

const addNewDay = async (date) => {
  const review = (
    await user1Collection
      .find({
        nextReviewAt: { $lte: date },
      })
      .toArray()
  ).length;
  await user1Collection.insertOne({ date: date, learn: [], review: review });
};

const deleteYesterday = async (date) => {
  await user1Collection.deleteMany({
    date: { $lt: date },
    learn: { $exists: true },
    review: { $exists: true },
  });
};
const getReviewForDayCount = async (date) => {
  return await user1Collection.findOne({
    date: date,
    learn: { $exists: true },
    review: { $exists: true },
  });
};

const getNewWordsForDay = async (
  limit,
  existingWords = [],
  resetWordId = ''
) => {
  const existingWordsIds = existingWords.map((word) => word._id.toString());
  if (resetWordId) {
    await user1Collection.updateOne(
      { resetWordsIds: { $exists: true } },
      {
        $push: { resetWordsIds: resetWordId },
      }
    );
  }
  const resetWords = await user1Collection.findOne({
    resetWordsIds: { $exists: true },
  });

  const words = await wordsCollection
    .aggregate([
      { $set: { idToString: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'user1',
          localField: 'idToString',
          foreignField: 'wordIdFromCommonDB',
          as: 'user1',
        },
      },

      { $match: { user1: { $size: 0 } } },

      { $match: { idToString: { $nin: existingWordsIds } } },

      { $match: { idToString: { $nin: resetWords.resetWordsIds } } },

      { $project: { word: 1, meaning: 1, examples: 1, form: 1 } },

      { $limit: limit },
    ])
    .toArray();
  return limit === 1 ? words[0] || null : words;
};

const getReviewWords = async (timestamp) => {
  const wordsForReview = await user1Collection
    .find(
      { nextReviewAt: { $exists: true } },
      {
        nextReviewAt: { $lte: timestamp },
      }
    )
    .toArray();

  return wordsForReview;
};

const deleteWord = async (id) => {
  if (!(id instanceof ObjectId)) {
    id = new ObjectId(id);
  }
  return await wordsCollection.deleteOne({ _id: id });
};

const deleteWords = async () => {
  return await wordsCollection.deleteMany({
    word: { $exists: true },
    meaning: { $exists: true },
    // examples: { $exists: true },
  });
};

const deleteResetWords = async () => {
  return await user1Collection.updateOne(
    { resetWordsIds: { $exists: true } },
    { $set: { resetWordsIds: [] } }
  );
};

const updateWord = async (id, word) => {
  if (!(id instanceof ObjectId)) {
    id = new ObjectId(id);
  }
  return await wordsCollection.updateOne({ _id: id }, { $set: word });
};

const updateReviewWord = async (word) => {
  const id = word.id instanceof ObjectId ? word.id : new ObjectId(word.id);

  return await user1Collection.updateOne(
    { _id: id },
    {
      $set: {
        reviewCount: word.reviewCount,
        lastReviewedAt: word.lastReviewedAt,
        nextReviewAt: word.nextReviewAt,
      },
    }
  );
};

const decreaseReviewCount = async (word) => {
  const id = word.id instanceof ObjectId ? word.id : new ObjectId(word.id);
  return await user1Collection.updateOne(
    { _id: id },
    {
      $set: {
        reviewCount: word.reviewCount,
      },
    }
  );
};

module.exports = {
  startService,
};
