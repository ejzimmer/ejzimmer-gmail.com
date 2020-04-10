import React, { useEffect, useState } from 'react';
import { fetchTrains } from '../utils/api';
import './Timeline.css';

const notches = [];
for (let i = 1; i < 12; i++) {
  notches.push(i * 5);
}

export default function() {
  const [trains, setTrains] = useState([])

  useEffect(() => {
    (async function fetchData() {
      setTrains(await fetchTrains())
    })()
  }, []); 

  return (
    <>
      <svg viewBox="0 0 60 7">
        {notches.map(notch => <path className="tie" key={notch} d={`M${notch} 0 v7`}></path>)}
        <path className="rail" d="M0 1 h60"></path>
        <path className="rail" d="M0 6 h60"></path>
        {trains.map(train => (
          <g className="train" key={train} transform={`translate(${train}, 0)`}>
            <circle cx="0" cy="3.5" r="3"></circle>
            <text x="0" y="5" fontSize="12">{train}</text>
          </g>
        ))}
      </svg>
    </>
  )
}