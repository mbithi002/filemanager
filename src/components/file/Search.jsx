import React, { useState } from 'react'
import { Download as DownloadComponent, Share as ShareComponent } from '../../assets/google/Icons'

function Search() {
  const [result, setResult] = useState([])
  const [recents, setRecents] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert('submit')
  }
  return (
    <div className='flex flex-col items-center w-full h-full'>
      <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300 w-1/4 mx-auto">
        Search
      </p>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="flex flex-row items-center justify-around">
          <input
            type="text"
            name="query"
            id="query"
            className='bg-white p-2 text-sm font-sans w-4/5 rounded-[2rem] border border-gray-300 shadow-lg'
          />
          <button type='submit' className="bg-white flex text-center w-[2.5rem] h-[2.5rem] rounded-[50%] mx-2 items-center border-gray-300 shadow-lg">
            <i class="fa-solid fa-magnifying-glass mx-auto"></i>
          </button>
        </div>
      </form>

      {/* handle result */}
      <div className="flex flex-col items-center w-full py-2 px-3 text-sm my-2">
        {/* loop */}
        <div className="flex flex-row justify-between w-full my-3 px-2 py-2 rounded-sm bg-teal-500 text-white ">
          <div className=""><i class="fa-solid fa-file"></i></div>
          <div className="">file name</div>
          <div className="">date</div>
          <div className="flex flex-row justify-between items-center">
            <ShareComponent w='24px' h='24px' c='#fff' />
            <DownloadComponent w='24px' h='24px' c='#fff' />
          </div>
        </div>
      </div>

      {/* handle history */}
      Recent 
      <div className="flex flex-col items-center bg-white w-full py-2 text-black text-sm">
        {/* loop */}
        <div className="flex flex-row w-full my-2">
          <i class="fa-solid fa-arrow-up mx-2 my-auto rotate-45"></i>{recents.length > 0 ? 'logic for recents' : 'no recents'}
        </div>
      </div>

    </div>
  )
}

export default Search