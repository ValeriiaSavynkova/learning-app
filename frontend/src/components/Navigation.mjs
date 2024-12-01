import { NavLink } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import WordsContext from './WordsContext.mjs';
import origin from '../config/config.mjs';
import getDateTimestamp from '../config/getTimestamp.mjs';
import './Navigation.css';

const Navigation = () => {
  const { wordsForReview, learnedWords, setLearnedWords, setWordsForReview } =
    useContext(WordsContext);

  const now = getDateTimestamp();

  useEffect(() => {
    getTodayCounts();
  }, []);

  const getTodayCounts = async () => {
    try {
      const response = await axios.post(`${origin}/api/today-counts`, {
        date: now,
      });
      console.log(response.data);
      setWordsForReview(response.data.reviewedCount);
      setLearnedWords(response.data.newWordsMemorized);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-section">
        <NavLink to="/new-words" className="nav-item">
          <span className="nav-icon">+</span>
          <div>
            <div className="main-nav-title">Learn new words</div>
            <div className="nav-subtitle">
              Memorized today: {learnedWords} of 5
            </div>
          </div>
        </NavLink>
        <NavLink to="/review" className="nav-item">
          <span className="nav-icon">↻</span>
          <div>
            <div className="main-nav-title">Review words</div>
            <div className="nav-subtitle">
              Words to review: {wordsForReview}
            </div>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
