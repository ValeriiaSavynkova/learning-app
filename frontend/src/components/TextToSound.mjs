// import './TextToSound.css';
import { useEffect, useState } from 'react';

function TextToSound({ word }) {
  //created state for having this input controlable
  let [voice, setVoice] = useState(''); //choosing voice options
  let [robot, setRobot] = useState(''); //making robot available
  let [voices, setVoices] = useState([]); // all voice choices that our robot can speak
  let [rate, setRate] = useState(1); //default rate is 1
  let [pitch, setPitch] = useState(1);
  useEffect(() => {
    //using useEffect to control callbacks and invocations
    if (window) {
      const robot = window.speechSynthesis; //all instance of the robot
      setRobot(robot);
    } // robot available in global scope not only in function scope
  }, [window.speechSynthesis]); // using square brackets because we want this callback only once(when window will change)
  useEffect(() => {
    if (robot) {
      let voices = robot.getVoices(); //got it from google (webspeech documantation) for voices to speak
      setVoices(voices);
      console.log(voices);
    } //make voices available in function scope
  }, [robot]); // if robot exists

  function speak(event) {
    //we get event from the form
    event.preventDefault(); // to prevent form from refresh

    //need to check if browser supports this speechSynthesis
    if (!robot) {
      // if its faulse
      alert('this API is not working for you');
    }
    if (word) {
      let robotSettings = new SpeechSynthesisUtterance(word);
      //instance to tell robot how to speak
      if (voice) {
        // if user selected custom voice then this voice is set to this robot setting
        robotSettings.voice = voice;
      }
      robotSettings.rate = rate; //set rate to our robot voice
      robotSettings.pitch = pitch;
      robot.speak(robotSettings);
    }
  }
  // to handle selected voice
  function selectVoiceHandler(event) {
    let value = event.target.value;
    let selectedVoice = voices[value];
    setVoice(selectedVoice);
  }

  function handleRate(event) {
    let value = event.target.value;
    setRate(parseFloat(value)); //turn string into number
  }

  function handlePitch(event) {
    let value = event.target.value;
    setPitch(parseFloat(value));
  }
  return (
    <form
      onSubmit={speak}
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'absolute', top: 0, right: 0 }}
    >
      <div style={{ display: 'none' }}>
        <label htmlFor="rate">Rate</label>
        <input
          type="range"
          min="0.5"
          max="2"
          value={rate}
          step="0.1"
          id="rate"
          onChange={handleRate}
        />
        <div className="rate-value">{rate}</div>
        <div className="clearfix"></div>
      </div>
      <div style={{ display: 'none' }}>
        <label htmlFor="pitch">Pitch</label>
        <input
          type="range"
          min="0"
          max="2"
          value={pitch}
          step="0.1"
          id="pitch"
          onChange={handlePitch}
        />
        <div className="pitch-value">{pitch}</div>
        <div className="clearfix"></div>
      </div>

      <select onChange={selectVoiceHandler} style={{ display: 'none' }}>
        <option>select voice</option>
        {voices.map(
          (
            voice,
            index // to show voices options in select box
            //each voice to have their own index and tell them apart with a key
            //in react we turn everything into curly brackets except string
          ) => (
            <option key={index} value={index}>
              {voice.name} {voice.lang}
            </option>
          )
        )}
      </select>
      <div className="controls">
        <button
          id="play"
          type="submit"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: '24px',
              height: '24px',
            }}
          >
            <path d="M11 5L6 9H2v6h4l5 4z"></path>
            <path d="M19 12c0-2.21-1.79-4-4-4m0 8c2.21 0 4-1.79 4-4z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
export default TextToSound;
