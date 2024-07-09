import React, { useState } from 'react';
import { Files, FileUpload, Insights, Search, Statistics, Toaster } from '../components/components';

function Dashboard() {
  const [content, setContent] = useState('statistics');

  return (
    <div className="flex flex-col items-center justify-around content-center min-h-screen sm:mt-10">
      <Toaster message={'Dashboard'} iconType={'info'} duration={'1000'} />
      <div className="container mx-auto px-3 min-h-full">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 min-h-[80dvh]">
          {/* Left Sidebar */}
          <div className="hidden sm:block sm:col-span-3 p-4 bg-gray-100 min-h-full">
            <p className="text-start text-black my-3"><i class="fa-solid fa-bars text-black mx-2 text-sm"></i>Menu</p>
            <div className="flex flex-col justify-start gap-2 items-center text-start h-full">
              <button
                onClick={() => setContent('statistics')}
                className="text-start rounded-md bg-gray-200 hover:bg-white hover:border active:bg-gray-200 duration-200 transition-all text-gray-800 p-2 w-full mb-5"
              >
                <i class="fa-solid fa-chart-pie mx-2 text-sm text-black"></i>Statistics
              </button>
              <button
                onClick={() => setContent('files')}
                className="text-start rounded-md bg-gray-200 hover:bg-white hover:border active:bg-gray-200 duration-200 transition-all text-gray-800 p-2 w-full mb-5"
              >
                <i class="fa-solid fa-file text-black mx-2 text-sm"></i>My Files
              </button>
              <button
                onClick={() => setContent('upload')}
                className="text-start rounded-md bg-gray-200 hover:bg-white hover:border active:bg-gray-200 duration-200 transition-all text-gray-800 p-2 w-full mb-5"
              >
                <i class="fa-solid fa-upload text-black mx-2 text-sm"></i>Upload
              </button>
              <button
                onClick={() => setContent('search')}
                className="text-start rounded-md bg-gray-200 hover:bg-white hover:border active:bg-gray-200 duration-200 transition-all text-gray-800 p-2 w-full mb-5"
              >
                <i class="fa-solid fa-search text-black mx-2 text-sm"></i>Search
              </button>
            </div>
          </div>

          {/* Center Content */}
          <div className="col-span-1 sm:col-span-6 bg-gray-100 p-4 min-h-full text-black">
            {content === 'statistics' && <Statistics />}
            {content === 'upload' && <FileUpload />}
            {content === 'search' && <Search />}
            {content === 'files' && <Files />}
          </div>

          {/* Right Sidebar */}
          <div className="sm:block sm:col-span-3 bg-gray-100 p-4 min-h-full text-black">
            <div className="">
              <p className="text-center font-semibold text-gray-700 text-md">More Insights</p>
            </div>
            <div className=""><Insights /></div>
          </div>
        </div>
      </div>
      {/* <FileUpload /> */}
    </div>
  );
}

export default Dashboard;
