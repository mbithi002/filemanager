// src/components/common/Spinner.jsx
import React from 'react';

const Spinner = ({w='full', h='screen'}) => {
  return (
    <div className={`flex justify-center items-center min-h-${h} w-${w} bg-black`}>
      <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-t-black rounded-full my-auto border-blue-600" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Spinner;