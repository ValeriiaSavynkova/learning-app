import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import origin from '../config/config.mjs';
import getDateTimestamp from '../config/getTimestamp.mjs';
import Card from './Card.mjs';
import './LearnAndReview.css';

function ReviewWords() {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let reviewForDayCount;

  const now = getDateTimestamp();
  const reviewInterval = [1, 3, 7, 10, 14, 30];

  useEffect(() => {
    console.log('useEffect');
    fetchWords();
  }, []);

  const fetchWords = async () => {
    console.log('fetching words to review');
    try {
      const response = await axios.post(`${origin}/api/review`, {
        currentDate: now,
      });
      console.log(response.data);
      setWords(response.data.words);
      setCurrentWordIndex(0);
      setReviewedCount(response.data.reviewedCount);
      reviewForDayCount = response.data.reviewForDayCount;
    } catch (error) {
      console.error('Error fetching words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reviewedWord = async (word) => {
    try {
      const response = await axios.post(`${origin}/api/review-update`, {
        word: {
          id: word._id,
          reviewCount: word.reviewCount + 1,
          lastReviewedAt: now,
          nextReviewAt:
            now + reviewInterval[word.reviewCount + 1] * 24 * 60 * 60 * 1000, // + 3, 7, 14, 30 days
        },
      });
      if (response.data.updated) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setReviewedCount((prevReviewedCount) => prevReviewedCount + 1);
      } else {
        throw new Error('Error post review word');
      }
    } catch (error) {
      console.error('Error post review word:', error);
    }
  };

  const missedWord = async (word, index) => {
    console.log(word);
    try {
      const reviewCountUpdate =
        word.reviewCount > 3 ? 3 : word.reviewCount === 3 ? 2 : 1;

      const missedWord = {
        id: word._id,
        word: word.word,
        meaning: word.meaning,
        wordIdFromCommonDB: word.wordIdFromCommonDB,
        reviewCount: reviewCountUpdate,
        lastReviewedAt: word.lastReviewedAt,
        nextReviewAt: word.nextReviewAt,
      };

      const response = await axios.post(`${origin}/api/reviewcount-decrease`, {
        word: missedWord,
      });

      if (response.data.updated) {
        const wordsForReview = [...words];
        wordsForReview.splice(index, 1);
        wordsForReview.push(missedWord);
        setWords(wordsForReview);
        setCurrentWordIndex((prevIndex) => prevIndex);
      } else {
        throw new Error('Error decrease review count');
      }
    } catch (error) {
      console.error('Error decrease review count', error);
    }
  };

  const currentWord = words[currentWordIndex] || null;

  const progressPercentage = (currentWordIndex / reviewForDayCount) * 100;

  return (
    <div className="review">
      {isLoading ? (
        <p>Loading...</p>
      ) : currentWordIndex < words.length ? (
        <>
          <div>
            <p>Review words</p>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <span className="progress-text">
              {reviewedCount} words reviewed
            </span>
          </div>
          <Card
            word={currentWord?.word}
            meaning={currentWord?.meaning}
            id={currentWord?._id}
          />
          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                reviewedWord(currentWord);
              }}
            >
              Got it
            </button>
            <button
              className="button secondary"
              onClick={() => {
                missedWord(currentWord, currentWordIndex);
              }}
            >
              Don't remember this word
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="completion-message">Nice job!</p>
          <NavLink to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <div className="nav-title">Main</div>
          </NavLink>
          <NavLink to="/new-words" className="nav-link">
            <span className="nav-icon">+</span>
            <div className="nav-title">Learn new words</div>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default ReviewWords;
