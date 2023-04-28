import React from 'react';

const Welcome = ({ onClick }) => {
  return (
    <div>
      <h1>Welcome to my app!</h1>
      <button onClick={onClick}>Go to main page</button>
    </div>
  );
};

export default Welcome;