// src/components/common/Spinner.jsx
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-black">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full my-auto border-blue-600" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Spinner;
