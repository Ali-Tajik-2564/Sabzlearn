import React, { useState, useEffect } from "react";

export default function LandingPageCounter({ count }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setCounter((preCount) => preCount + 1);
    }, 1);
    if (counter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div>
      <span className='landing-status__count'>{counter}</span>
    </div>
  );
}
