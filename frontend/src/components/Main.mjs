import './Main.css';
import Navigation from './Navigation.mjs';

const currentStreak = 0;
const bestStreak = 0;

const Main = () => {
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
