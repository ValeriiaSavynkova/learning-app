import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main.mjs';
import LearnNewWords from './components/LearnNewWords.mjs';
import ReviewWords from './components/ReviewWords.mjs';
import NotFound from './components/NotFound.mjs';
import WordsContext from './components/WordsContext.mjs';

function App() {
  const [wordsForReview, setWordsForReview] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);

  return (
    <WordsContext.Provider
      value={{
        wordsForReview,
        setWordsForReview,
        learnedWords,
        setLearnedWords,
      }}
    >
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/new-words" element={<LearnNewWords />} />
            <Route path="/review" element={<ReviewWords />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WordsContext.Provider>
  );
}

export default App;
