import React, { useEffect } from 'react';

const Toaster = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Close the Toaster after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 inset-x-0 mx-auto mt-4 w-11/12 max-w-sm bg-red-500 text-white rounded-md shadow-lg flex items-center p-4 transform transition-transform duration-500 ease-in-out Toaster">
      <div className="flex items-center justify-center w-1/3">
      <i class="fa-solid fa-xmark text-red-400 font-bold"></i>
      </div>
      <div className="w-2/3 pl-4">
        {message}
      </div>
    </div>
  );
};

export default Toaster;
