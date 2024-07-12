import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../../appwrite/config';
import { Download as DownloadComponent, Share as ShareComponent } from '../../assets/google/Icons';
import useUserFiles from '../../hooks/useUserFiles';
import { CustomSpinner, Toaster } from '../components';
import { downloadFile, shareFile } from './fileActions';

function Search() {
  const [result, setResult] = useState([]);
  const [recents, setRecents] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  const { allFiles } = useUserFiles(userData);
  const [search, setSearch] = useState('');
  const [toaster, setToaster] = useState({ message: 'Search your files', type: 'info', duration: 1000 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (allFiles) {
      setIsMounted(true);
      setRecents(Array.isArray(allFiles) ? allFiles.slice(0, 6) : Object.values(allFiles).slice(0, 6));
    }
  }, [allFiles]);

  const deleteFile = async (fileId, fileName) => {
    try {
      const res = await service.fileDelete(fileId);
      if (!res) {
        alert("Failed to delete file");
        return;
      } else {
        setResult(result.filter(file => file.$id !== fileId));
        alert(`${fileName} file deleted`);
      }
    } catch (error) {
      alert(error.message);
      throw new Error(error);
    }
  };

  const handleSearch = (query) => {
    const filesArray = allFiles ? (Array.isArray(allFiles) ? allFiles : Object.values(allFiles)) : [];
    const filteredFiles = filesArray.filter((file) => file.name.toLowerCase().includes(query.toLowerCase()));
    setResult(filteredFiles);
  };

  const handleSubmit = (e, queryParam = search) => {
    e.preventDefault();
    if (!queryParam) {
      setToaster({ message: 'Please enter a search term', type: 'error', duration: 2000 });
      return;
    }
    handleSearch(queryParam);
  };

  const RenderResult = ({ result }) => (
    <div className="flex flex-col items-center w-full py-2 px-3 text-sm my-2">
      {result.length > 0 && (
        <div onClick={() => setResult([])} className="flex flex-col self-start cursor-pointer">
          <i className="fa-solid fa-circle-xmark text-xl text-red-500"></i>
        </div>
      )}
      {result.length > 0 ? result.map((file) => (
        <div key={file.$id} className="flex flex-row justify-between w-full mb-1 px-2 py-2 rounded-sm bg-teal-500 text-white">
          <div><i className="fa-solid fa-file"></i></div>
          <div>{file.name}</div>
          <div>{new Date(file.$createdAt).toLocaleDateString()}</div>
          <div className="flex flex-row justify-between items-center">
            <div className="cursor-pointer mx-1" onClick={() => shareFile(file.$id)}>
              <ShareComponent w='24px' h='24px' c='#fff' />
            </div>
            <div className="cursor-pointer mx-1" onClick={() => downloadFile(file.$id)}>
              <DownloadComponent w='24px' h='24px' c='#fff' />
            </div>
            <div className="cursor-pointer mx-1" onClick={() => deleteFile(file.$id, file.name)}>
              <i className="fa-solid fa-trash mx-2 text-xl"></i>
            </div>
          </div>
        </div>
      )) : <p>No results found</p>}
    </div>
  );

  if (!isMounted) {
    return <CustomSpinner />;
  }

  return (
    <div className='flex flex-col items-center w-full h-full sm:-mt-0 -mt-[7rem] sm:pt-0 pt-5'>
      <Toaster message={toaster.message} iconType={toaster.type} duration={toaster.duration} />
      <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300 w-1/4 mx-auto">Search</p>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
        <div className="flex flex-row items-center justify-around">
          <input
            type="text"
            placeholder='Search by name...'
            name="query"
            id="query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-white p-2 text-sm font-sans w-4/5 rounded-[2rem] border border-gray-300 shadow-lg'
          />
          <button type='submit' className="bg-white flex text-center w-[2.5rem] h-[2.5rem] rounded-[50%] mx-2 items-center border-gray-300 shadow-lg">
            <i className="fa-solid fa-magnifying-glass mx-auto"></i>
          </button>
        </div>
      </form>
      <RenderResult result={result} />
      <div className="flex flex-col bg-white w-full py-2 text-black text-sm">
        <p className='text-center'>Recent</p>
        {recents.length > 0 ? recents.map((file) => (
          <div key={file.$id} className="flex flex-row w-full my-2 justify-between px-2">
            <input type="text" value={file.name} readOnly className="block" />
            <button onClick={(e) => handleSubmit(e, file.name)} className="border-none bg-none">
              <i className="fa-solid fa-arrow-up mx-2 my-auto -rotate-45"></i>
            </button>
          </div>
        )) : <p>No recents</p>}
      </div>
    </div>
  );
}

export default Search;
