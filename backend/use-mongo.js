const dotenv = require('dotenv');

dotenv.config();

const { startService } = require('./mongo-service.js');

const main = async () => {
  try {
    const {
      addWord,
      addManyWords,
      getWords,
      updateWord,
      deleteWords,
      deleteResetWords,
      getNewWordsForDay,
      getFirstRender,
      getReviewWords,
      getMemorizedWordsCount,
      getStreaks,
    } = await startService();
    // console.log(await getFirstRender(1725055200000));
    //await updateWord('669f8942d5d4353cfed8ce4d', {
    //   meaning: 'to begin something',
    // });

    //   const words = await getWords();

    //console.log(await getMemorizedWordsCount(1725746400000));

    //console.log((await getReviewWords(1725746400000)).length);

    //await getWords();

    // const result = await deleteWords();

    // console.log(result);

    //await deleteResetWords();

    // const words = await getNewWordsForDay(5);
    // console.log(words);
    const words = [
      {
        word: 'agenda',
        meaning:
          'Це список тем або справ, які потрібно обговорити або виконати, зазвичай на зібранні або протягом певного періоду часу. Наприклад, коли люди збираються на ділову зустріч, у них є документ із переліком питань, які вони планують розглянути.',
        form: 'Іменник (n.)',
        examples: [
          'The first item on the agenda was to discuss the budget.',
          'She had a hidden agenda when she proposed that policy.',
          "Let's review the agenda before starting the meeting.",
          'His agenda for the day included three meetings.',
          "The committee set the agenda for next month's conference.",
        ],
      },
      {
        word: 'housing',
        meaning:
          'Це забезпечення людей місцем для життя, включаючи будинки, квартири та інші види житлових приміщень. Це також може стосуватися процесу будівництва будинків або державної політики в цій галузі.',
        form: 'Іменник (n.)',
        examples: [
          'The city needs more affordable housing.',
          'They live in student housing near the university.',
          'The government announced new housing policies.',
          'Many people face housing problems in big cities.',
          'The housing market is very competitive in this area.',
        ],
      },
      {
        word: 'hardly',
        meaning:
          'Це слово використовується, коли щось відбувається або робиться з великими труднощами, ледь-ледь, або майже не відбувається зовсім.',
        form: 'Прислівник (adv.)',
        examples: [
          'I hardly slept last night.',
          'She hardly ever visits her hometown anymore.',
          'We could hardly see through the fog.',
          'The noise was hardly noticeable.',
          'He hardly speaks to anyone at work.',
        ],
      },
      {
        word: 'total',
        meaning:
          'Це описує щось, що є повністю завершеним або включає все без винятку.',
        form: 'Прикметник (adj.)',
        examples: [
          'The total cost of the project was much higher than expected.',
          'There was a total of five participants in the contest.',
          'Her explanation made total sense.',
          'The team achieved a total victory in the tournament.',
          'He has a total of 30 books in his collection.',
        ],
      },
      {
        word: 'total',
        meaning: 'Це кінцеве число або сума після підрахунків.',
        form: 'Іменник (n.)',
        examples: [
          'The total for your purchase is $50.',
          'We calculated the total number of votes.',
          'The final total was much higher than anticipated.',
          'Add these numbers to get the total.',
          'The total of our expenses this month is alarming.',
        ],
      },
      {
        word: 'report',
        meaning:
          'Це дія, коли ви передаєте інформацію про щось, що сталося, або те, що ви бачили чи дізналися.',
        form: 'Дієслово (v.)',
        examples: [
          'She reported the accident to the police.',
          'The journalist reported on the election results.',
          'Please report any suspicious activity to security.',
          'He reported a bug in the software.',
          'The team reported significant progress in the project.',
        ],
      },
      {
        word: 'report',
        meaning:
          'Це офіційний документ або повідомлення, в якому викладена інформація про щось, що сталося.',
        form: 'Іменник (n.)',
        examples: [
          'The report on climate change was released yesterday.',
          'The teacher asked for a report on the experiment.',
          'She submitted her report to the board of directors.',
          "The report highlights the company's achievements.",
          'The weather report predicts heavy rain tomorrow.',
        ],
      },
      {
        word: 'planning',
        meaning:
          'Це процес створення планів для досягнення чогось у майбутньому.',
        form: 'Іменник (n.)',
        examples: [
          'Good planning is essential for success.',
          'The team spent hours on project planning.',
          'Event planning can be stressful but rewarding.',
          'City planning includes designing roads and parks.',
          'They are engaged in financial planning for their retirement.',
        ],
      },
      {
        word: 'celebration',
        meaning:
          'Це захід або подія, що проводиться для святкування чогось особливого.',
        form: 'Іменник (n.)',
        examples: [
          'The celebration of her birthday was a grand event.',
          'They held a celebration for their wedding anniversary.',
          'The holiday celebration brought the community together.',
          "We had a small celebration for our team's success.",
          'The celebration included fireworks and music.',
        ],
      },
      {
        word: 'high school',
        meaning:
          'Це навчальний заклад, де підлітки отримують середню освіту перед вступом до університету або на роботу.',
        form: 'Іменник (n.)',
        examples: [
          'He graduated from high school last year.',
          'High school can be a challenging time for many students.',
          'The high school football team won the championship.',
          'She teaches math at the local high school.',
          'The high school is hosting a science fair next week.',
        ],
      },
    ];
    const result = await addManyWords(words);
    //const result = await deleteWords();
  } catch (error) {
    console.error(error);
  }
};

main();
