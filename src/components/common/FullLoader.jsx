import React from 'react';

function FullLoader({ message = 'loading' }) {
  return (
    <div className='fixed inset-0 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-75 z-50'>
      <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      <p className="text-center text-white">{ message }...</p>
    </div>
  );
}

export default FullLoader;
