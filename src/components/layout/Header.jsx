// src/components/common/Header.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { Button } from '../components';

const Header = () => {
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    }).finally(() => navigate('/'))
  };

  return (
    <>
      {/* Larger screen header */}
      <header className="hidden sm:block bg-blue-500 text-white shadow-md mb-30 fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">File Manager<i class="fa-regular fa-file mx-2"></i></Link>
          </div>
          <nav className="space-x-4 flex justify-between items-center">
            <Link to="/" className="hover:underline">
              <i class="fa-solid fa-house text-green-300"></i> Home
            </Link>
            {status ? (
              <>
                <Link to="/file-list" className="hover:underline">
                  <i class="fa-solid fa-file text-green-300"></i> Files
                </Link>
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
        <div className="">
          <h1>File Manager<i class="fa-regular fa-file mx-2"></i></h1>
        </div>
        <div className="">
          <Link>
            <i class="fa-solid fa-ellipsis-vertical mx-3"></i>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
