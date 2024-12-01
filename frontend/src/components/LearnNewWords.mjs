import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './LearnAndReview.css';
import axios from 'axios';
import Card from './Card.mjs';
import origin from '../config/config.mjs';
import getDateTimestamp from '../config/getTimestamp.mjs';

function LearnNewWords() {
  console.log('start');

  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const now = getDateTimestamp();

  const toastOptions = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  };

  useEffect(() => {
    console.log('useEffect');

    (async function () {
      try {
        const response = await axios.post(`${origin}/api/first-render`, {
          date: now,
        });
        console.log(`isFirstRender: ${response.data.isFirstRender}`);

        if (response.data.isFirstRender) {
          console.log('Fetching new words');

          fetchNewWords();
        } else {
          console.log('Fetching today’s words');

          fetchTodayWords();
        }
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    })();
  }, []);

  const fetchNewWords = async () => {
    console.log('fetching new words');
    try {
      const response = await axios.post(`${origin}/api/new-words`, {
        date: now,
      });
      setWords(response.data);
      setCurrentWordIndex(0);
    } catch (error) {
      console.error('Error fetching words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodayWords = async () => {
    console.log('fetching today words');
    try {
      const response = await axios.post(`${origin}/api/today-words`, {
        date: now,
      });
      setWords(response.data.words);
      setCurrentWordIndex(response.data.currentIndex);
    } catch (error) {
      console.error('Error fetching words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWord = async (index, resetWordId, word) => {
    try {
      const existingWords = [...words];
      const response = await axios.post(`${origin}/api/anotherword`, {
        words: existingWords,
        wordId: resetWordId?.toString(),
        date: now,
        index,
      });
      if (response.data.success) {
        toast.info(`Word '${word}' will no longer be shown!`, toastOptions);
        const newWords = words.toSpliced(index, 1, response.data.word);
        setWords(newWords);
      }
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const addWordToCollection = async (word) => {
    console.log('adding word to collection');
    try {
      const response = await axios.post(`${origin}/api/word`, {
        word: {
          word: word.word,
          meaning: word.meaning,
          lastReviewedAt: now,
          nextReviewAt: now + 24 * 60 * 60 * 1000, // + 1 day
          reviewCount: 0,
          wordIdFromCommonDB: word._id,
        },
        date: now,
      });
      if (response.data.added) {
        toast.success(`Word '${word.word}' added!`, toastOptions);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      } else {
        toast.error(`Word '${word.word}' didn't add!`, toastOptions);
      }
    } catch (error) {
      console.error('Error adding word to collection:', error);
    }
  };

  const currentWord = words[currentWordIndex] || null;

  console.log(currentWordIndex);

  return (
    <div className="learn-new-words">
      <div className="header">
        <div className="left-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <h2 className="nav-title">Home</h2>
          </NavLink>
        </div>
        <div className="center-nav">
          <NavLink
            to="/new-words"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <h2 className="nav-title">Learn new words</h2>
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <h2 className="nav-title">Review words</h2>
          </NavLink>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : currentWordIndex < words.length ? (
        <>
          <ToastContainer />
          <Card
            word={currentWord?.word}
            meaning={currentWord?.meaning}
            form={currentWord?.form}
            examples={currentWord?.examples}
            id={currentWord?._id}
          />

          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                addWordToCollection(currentWord);
              }}
            >
              Start learning this word
            </button>
            <button
              className="button secondary"
              onClick={() => {
                resetWord(currentWordIndex, currentWord._id, currentWord.word);
              }}
            >
              I already know this word
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="completion-message">Nice job!</p>
          <NavLink to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <div className="nav-title">Home</div>
          </NavLink>
          <NavLink to="/review" className="nav-link">
            <span className="nav-icon">↻</span>
            <div className="nav-title">Review words</div>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default LearnNewWords;
