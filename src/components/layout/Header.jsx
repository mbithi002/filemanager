// src/components/common/Header.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { Button } from '../components';

const Header = () => {
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [canvas, setCanvas] = useState(false)

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    canvas && setCanvas(false)
    }).finally(() => navigate('/'))
  };

  return (
    <>
      {/* Larger screen header */}
      <header className="hidden sm:block bg-blue-500 text-white shadow-md mb-30 fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">bucketHub<i class="fa-regular fa-file mx-2"></i></Link>
          </div>
          <nav className="space-x-4 flex justify-between items-center">
            <Link to="/" className="hover:underline">
              <i class="fa-solid fa-house text-green-300"></i> Home
            </Link>
            {status ? (
              <>
                <Link to="/dashboard" className="hover:underline">
                  <i class="fa-solid fa-chart-line text-green-300"></i> Dashboard
                </Link>
                <div className='font-bold hover:border-gray-200 duration-200 transition-all p-1 bg-green-300 text-black'>
                  <span className="ml-4">{userData.name}</span>
                  <Button onClick={handleLogout} className="ml-4 bg-red-500 mx-2 rounded-[2rem]">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-[2rem] py-2 px-3 hover:text-white text-center hover:bg-blue-300 transition-all duration-200 hover:underline">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[2rem] py-2 px-3 hover:text-black text-center hover:bg-green-500 transition-all duration-200 hover:underline">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      {/* Mobile Header */}
      <header className="sm:hidden bg-blue-500 text-white shadow-md mb-30 fixed top-0 w-full z-50 flex flex-row justify-between items-center h-[4rem] px-2">
        <div
          className=""
        >
          <Link to={'/'}>
            <h1>File Manager<i class="fa-regular fa-file mx-2"></i></h1>
          </Link>
        </div>
        <div
          onClick={() => setCanvas(true)}
          className="cursor-pointer">
          <i class="fa-solid fa-ellipsis-vertical mx-3"></i>
        </div>
      </header>
      {
        canvas && (
          <div className="canvas fixed z-50 min-w-[80vw] h-[100dvh] bg-gray-800 p-2 flex flex-col">
            <div className="relative flex flex-col text-start text-gray-200">
              <div onClick={() => setCanvas(false)} className="self-end cursor-pointer">
                <i className='fa-regular fa-circle-xmark self-end text-2xl m-2'></i>
              </div>
              <div onClick={() => setCanvas(false)} className="ml-2">
                <Link to={'/'}>
                  <p className='text-2xl font-semibold'>Home</p>
                </Link>
              </div>
              <div onClick={() => setCanvas(false)} className="">
                <Link to={'/dashboard'}>
                  <p className="rounded-lg py-2 mx-2 my-4 px-4 bg-gray-200 text-gray-700">
                    Dashboard
                  </p>
                </Link>
              </div>
              {
                status ? (
                  <div className="flex flex-col my-2 justify-between">
                    <div className="">
                      <i className='fa-solid fa-circle-user text-3xl mx-2 inline'></i>
                      <span className="block mx-1 text-lg border border-gray-100 m-2 rounded-lg p-2 font-semibold">{userData.name}</span>
                      <span className="block mx-1 text-lg border border-gray-100 m-2 rounded-lg p-2">{userData.email}</span>
                    </div>
                    <div className="flex w-full">
                      <button onClick={() => handleLogout()} className="norder-none bg-gray-200 rounded-lg text-gray-700 text-xl font-semibold bottom-0 w-full self-center p-2 -mb-[90dvh] my-2">Logout</button>
                    </div>
                  </div>
                )
                  :
                  null
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default Header;
