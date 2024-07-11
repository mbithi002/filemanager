import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroFind, HeroOrganise, HeroShare, HeroTwo, HeroUpload } from '../assets/assets';
import { Toaster } from '../components/components';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function Home() {
  const [isVisible, setVisible] = useState(false)

  const elementRef = useIntersectionObserver(() => {
    setVisible(true)
  }, { threshold: 0.1 })
  return (
    <div className="text-center min-h-screen w-full py-10 px-5  bg-gray-200">
      <Toaster message={'Home'} iconType={'info'} duration={'1000'} />
      <div className="container my-10">
        <div className="grid sm:grid-cols-2 min-h-[70dvh] p-3 gap-5">
          <div className="flex flex-col justify-between">
            <p className="text-left text-gray-700 my-auto">
              <span className='font-bold text-2xl mb-3 text-blue-500 block text-focus-in'>Welcome to Your File Management Hub</span>
              <span className="text-sm text-black">
                Discover a <strong>seamless</strong> way to <strong>store</strong>, <strong>manage</strong>, and <strong>share</strong> files of any format with ease. Whether you're organizing personal documents, sharing creative projects, or collaborating with teams, our app simplifies your workflow.
              </span>
            </p>
            <div className="self-start sm:-mt-10 sm:mb-10">
              <Link to={'/dashboard'}>
                <button className='p-2 m-2 rounded-[3rem] bg-green-400 w-[10rem] bounce-top bounce-top'>Get Started</button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center content-center w-full p-3 contain-content z-10 slide-top sm:-mb-[160px] sm:mt-0 mt-[100px]">
            <HeroTwo w='full' h='full' />
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center mt-2 sm:mt-0 border border-b-gray-700 sm:border-none">
        <p className="text-center font-semibold text-2xl text-gray-700">Explore these features</p>
        <div className="grid sm:grid-cols-2 p-3 gap-5 items-center py-10 sm:max-h-[50dvh] sm:flex-col-reverse">
          <div className={`flex items-center justify-center h-[50dvh] ${isVisible ? 'fade-in' : ''}`}>
            <HeroUpload w='full' h='full' />
          </div>
          <div className="text-gray-700 flex flex-col text-start items-start justify-center">
            <p className="my-auto">
              <span ref={elementRef} className={`text-xl text-green-500 mb-5 block underline font-bold ${isVisible ? 'text-focus-in' : ''} `}>Upload Files:<i class="fa-solid fa-upload mx-2 text-gray-700"></i></span>
              Store documents, images, videos, and more securely in our Appwrite-powered database.
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center mt-2 sm:mt-0 border border-b-gray-700 sm:border-none">
        <div className="grid sm:grid-cols-2 p-3 gap-5 items-center py-10 sm:max-h-[50dvh]">
          <div className="text-gray-700 flex flex-col text-start items-start justify-center">
            <p className="my-auto">
              <span className="text-xl text-green-500 mb-5 block underline font-bold">Manage Collections:<i class="fa-solid fa-list-check my-auto mx-2 text-gray-700"></i></span>
              Organize your files into folders, tag them for quick retrieval, and keep everything organized.
            </p>
          </div>
          <div
            ref={elementRef}
            className={`flex items-center justify-center h-[50dvh] ${isVisible ? 'tilt-in-fwd-tr' : ''}`}>
            <HeroOrganise w='full' h='full' />
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center mt-2 sm:mt-0 border border-b-gray-700 sm:border-none">
        <div className="grid sm:grid-cols-2 p-3 gap-5 items-center py-10 sm:max-h-[50dvh]">
          <div className="flex items-center justify-center h-[50dvh]">
            <HeroShare w='full' h='full' />
          </div>
          <div className="text-gray-700 flex flex-col text-start items-start justify-center">
            <p className="my-auto">
              <span className="text-xl text-green-500 mb-5 block underline font-bold">Share Seamlessly: <i class="fa-solid fa-paper-plane mx-2 my-auto text-gray-700"></i></span>
              Share files effortlessly with colleagues, friends, or clients via secure links.
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center mt-2 sm:mt-0 border border-b-gray-700 sm:border-none">
        <div className="grid sm:grid-cols-2 p-3 gap-5 items-center py-10 sm:max-h-[50dvh]">
          <div className="text-gray-700 flex flex-col text-start items-start justify-center">
            <p className="my-auto">
              <span className="text-xl text-green-500 mb-5 block underline font-bold">Retrieve Anytime: <i class="fa-solid fa-magnifying-glass mx-2 my-auto text-gray-700"></i></span>
              Access your files from anywhere, anytime, ensuring you have what you need when you need it.
            </p>
          </div>
          <div className="flex items-center justify-center h-[50dvh]">
            <HeroFind w='full' h='full' />
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-around items-center mt-10 sm:my-20 gap-10">
        <p className="text-center font-semibold text-green-500 text-xl">
          Ready to streamline your file management? Dive in and experience the future of file organization and sharing.
        </p>
        <Link to={'/dashboard'}>
          <button className="py-2 px-5 cursor-pointer rounded-[3rem] bg-green-400 text-white text-semi-bold">Start Now</button></Link>
      </div>
      <div className="container sm:h-fit h-[70dvh] sm:bg-gray-200 bg-teal-200 sm:py-0 py-3 sm:my-0 my-3">
        <div className="sm:grid flex flex-col items-center justify-evenly sm:grid-cols-4 py-2 h-[120px] sm:bg-gray-200 bg-teal-200 gap-2">
          <div className="sm:col-span-1 w-full h-full content-center sm:mb-0 mb-3 flex flex-col items-center">
            <div className="heartbeat flex flex-col items-center text-green-400 hover:border hover:border-green-400 hover:rounded-[50%] transition-all duration-100 p-5 cursor-pointer">
              <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
              <p className="text-center text-2xl">Upload</p>
            </div>
          </div>
          <div className="sm:col-span-1 w-full h-full content-center sm:mb-0 mb-3 flex flex-col items-center">
            <div className="heartbeat flex flex-col items-center text-blue-400 hover:border hover:border-blue-400 hover:rounded-[50%] transition-all duration-100 p-5 cursor-pointer">
              <i className="fa-solid fa-pen-nib text-3xl"></i>
              <p className="text-center text-2xl">Update</p>
            </div>
          </div>
          <div className="sm:col-span-1 w-full h-full content-center sm:mb-0 mb-3 flex flex-col items-center">
            <div className="heartbeat flex flex-col items-center text-teal-700  hover:border hover:border-teal-700 hover:rounded-[50%] transition-all duration-100 p-5 cursor-pointer">
              <i className="fa-solid fa-magnifying-glass text-3xl rotate-90"></i>
              <p className="text-center text-2xl">Retrieve</p>
            </div>
          </div>
          <div className="sm:col-span-1 w-full h-full content-center sm:mb-0 mb-3 flex flex-col items-center">
            <div className="heartbeat flex flex-col items-center text-red-700  hover:border hover:border-red-700 hover:rounded-[50%] transition-all duration-100 p-5 cursor-pointer">
              <i className="fa-solid fa-trash text-3xl"></i>
              <p className="text-center text-2xl">Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
