import React, { useState, useEffect } from 'react';
import './LearnAndReview.css';

function Card({ word, meaning, id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className={`content ${!isFlipped ? 'front' : 'back'}`}>
        {!isFlipped ? (
          <h2>{word}</h2>
        ) : (
          <>
            <p>
              <strong>Meaning:</strong> {meaning}
            </p>
            {/* <p>
              <strong>Examples:</strong>
            </p>
            <ul>
              {examples?.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
