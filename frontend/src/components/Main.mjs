import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import Navigation from './Navigation.mjs';
import origin from '../config/config.mjs';

const Main = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    console.log('useEffect');
    getStreaks();
  }, []);

  const getStreaks = async () => {
    try {
      const response = await axios.get(`${origin}/api/streaks`);
      console.log(response.data);
      setCurrentStreak(response.data.currentStreak);
      setBestStreak(response.data.bestStreak);
    } catch (error) {
      console.error('Error fetching streaks:', error);
    }
  };

  return (
    <div className="main-page">
      <div className="main-header">
        <h1 className="logo">Learning-app</h1>
      </div>
      <Navigation />
      <div className="stats">
        <div className="streak-container">
          <div className="streak-box">
            <div className="streak-title">Current streak</div>
            <div className="streak-value">{currentStreak} days in a row</div>
          </div>
          <div className="streak-box">
            <div className="streak-title">Best streak</div>
            <div className="streak-value">{bestStreak} days in a row</div>
          </div>
        </div>
        <div className="memorized-today">
          <div className="memorized-title">Memorized today</div>
          <div className="memorized-value">0</div>
        </div>
      </div>
    </div>
  );
};
export default Main;
