import React, { useState, useEffect } from 'react';
import axios from 'axios';
import origin from '../config/config.mjs';

import './LearnAndReview.css';

function Card({ word, meaning, form, examples, id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [visableExamples, setVisebleExamples] = useState(examples);
  const [examplesHistory, setExamplesHistory] = useState(examples);
  console.log(word, meaning, form, examples);

  const partOfForm = form?.substring(form.indexOf('('), form.indexOf(')') + 1);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const getExtraExamples = async () => {
    try {
      const response = await axios.post(`${origin}/api/extra-examples`, {
        word,
        form,
        meaning,
        examples: examplesHistory,
      });
      console.log(response.data);
      const extraExamples = response.data
        .split('. ')
        .map((example, index, array) => {
          if (index === array.length - 1) {
            return example;
          } else {
            return example + '.';
          }
        });
      setExamplesHistory([...examplesHistory, ...extraExamples]);
      setVisebleExamples(extraExamples);
    } catch (error) {
      console.error('Error fetching extra examples:', error);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className={`content ${!isFlipped ? 'front' : 'back'}`}>
        {!isFlipped ? (
          <p>
            <strong>{form}:</strong>
            <span>{meaning}</span>
          </p>
        ) : (
          <>
            <p>
              <strong>{`${word} ${partOfForm}`}</strong>
            </p>
            <p>
              <strong>Examples:</strong>
            </p>
            <ul>
              {visableExamples?.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
            <div>
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  getExtraExamples();
                }}
              >
                Extra examples
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
