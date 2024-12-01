const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.OPENAI_API_KEY);
// Инициализируем клиента с помощью ключа API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getNewExamplesHandler = async (req, res) => {
  try {
    const { word, form, meaning, examples } = req.body;
    if (typeof word !== 'string' || !word.trim()) {
      throw new Error('Invalid word input. Please provide a valid word.');
    }

    if (typeof form !== 'string' || !form.trim()) {
      throw new Error(
        'Invalid form input. Please provide a valid grammatical form.'
      );
    }

    if (typeof meaning !== 'string' || !meaning.trim()) {
      throw new Error(
        'Invalid meaning input. Please provide a valid explanation.'
      );
    }

    if (
      !Array.isArray(examples) ||
      examples.some((ex) => typeof ex !== 'string')
    ) {
      throw new Error(
        'Invalid examples input. Please provide an array of strings.'
      );
    }

    const content = `Objective: Generate 5 additional unique example sentences for the word in the specified grammatical form.
Guidelines:
Ensure all 5 sentences are completely different from the previous 5 sentences.
Use the word in its specified grammatical form.
Maintain natural, contextually appropriate usage.
Avoid repeating any previously used sentences.
The response must consist of plain text sentences, one after another, without numbering, bullets, or Markdown formatting, sentences should be in one paragraph. 
Word Details:
Word: ${word}
Grammatical Form: ${form}
Ukrainian Explanation: ${meaning}

Previous 5 Sentences:
${examples}

Task: Generate 5 new, unique example sentences in English that have not been used before, following the same context and usage and not longer 70 symbols per sentence.`;

    const chatCompletion = await withTimeout(
      openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a English teacher.' },
          { role: 'user', content },
        ],
      }),
      10000 // Тайм-аут 10 секунд
    );

    if (
      !chatCompletion ||
      !chatCompletion.choices ||
      !chatCompletion.choices.length
    ) {
      throw new Error('No response from OpenAI API.');
    }

    res.send(chatCompletion.choices[0].message.content.trim());
  } catch (error) {
    console.error('Error generating new examples:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw new Error('Failed to generate examples. Please try again later.');
  }
};

async function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
  );
  return Promise.race([promise, timeout]);
}

module.exports = { getNewExamplesHandler };
