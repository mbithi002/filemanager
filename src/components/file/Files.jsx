import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import service from '../../appwrite/config';
import { Audio as AudioComponent, Doc as DocComponent, Download as DownloadComponent, Images as ImageComponent, Others as OthersComponent, Share as ShareComponent, Video as VideoComponent } from '../../assets/google/Icons';
import useUserFiles from '../../hooks/useUserFiles';
import { CustomSpinner, Toaster } from '../components';

function Files() {
  const { userData } = useSelector((state) => state.auth);
  const { allFiles } = useUserFiles(userData);
  const [isMounted, setIsMounted] = useState(false);
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  const downloadFile = async (fileId) => {
    setDownloading(true)
    try {
      const url = await service.getFileDownload(fileId);

      if (!url) {
        setDownloading(false)
        setError('Download failed')
        return;
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setDownloading(false)
    } catch (error) {
      console.log("Files :: downloadFile() :: ", error);
      setError(error.message);
    }
  };
  const shareFile = async (fileId) => {
    try {
      const res = await service.getFileDownload(fileId);
      if (!res) {
        setError('Failed to copy Link');
        return;
      }
      const url = res.toString();
      await window.navigator.clipboard.writeText(url);
      alert("Link Copied", url);
    } catch (error) {
      setError(error.message);
      alert(error.message);
      throw error;
    }
  };


  const renderFileCard = (file, IconComponent, borderColor, textColor) => (
    <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border p-2 bg-gray-100" style={{ borderColor }}>
      <p className="text-center text-sm min-w-full overflow-x-hidden hover:overflow-x-visible cursor-pointer">{file.name}</p>
      <div className="flex items-center mx-auto mt-3">
        <IconComponent c={borderColor} w='4rem' h='4rem' className='self-center' />
      </div>
      <div className="flex flex-row items-center justify-around rounded-md w-1/2 mx-auto">
        <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
          <div
            className=""
            onClick={() => shareFile(file.$id)}
            key={file.$id}
          >
            <ShareComponent w='1rem' h='1rem' c='#232323' />
          </div>
        </div>
        <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
          <div
            className=""
            onClick={() => downloadFile(file.$id)}
            key={file.$id}
          >
            <DownloadComponent w='1rem' h='1rem' c='#232323' />
          </div>
        </div>
      </div>
      {/* <p className="text-center" style={{ color: textColor }}>{new Date(file.$createdAt).toLocaleDateString()}</p> */}
      <div className="w-full flex flex-row justify-around items-center">
        <p className="text-center text-sm" style={{ color: textColor }}>
          <span className="text-black text-sm">Date: </span>{new Date(file.$createdAt).getDate()}/{new Date(file.$createdAt).getMonth() + 1}/{new Date(file.$createdAt).getFullYear()}
        </p>
      </div>
    </div>
  );

  const categorizeFiles = (files) => {
    const categories = {
      audio: [],
      video: [],
      images: [],
      documents: [],
      others: [],
    };

    files.forEach((file) => {
      const mimeType = file.mimeType;
      if (mimeType.startsWith('audio')) {
        categories.audio.push(file);
      } else if (mimeType.startsWith('video')) {
        categories.video.push(file);
      } else if (mimeType.startsWith('image')) {
        categories.images.push(file);
      } else if (mimeType.startsWith('application')) {
        categories.documents.push(file);
      } else {
        categories.others.push(file);
      }
    });

    return categories;
  };

  // Ensure allFiles is defined and is an array
  const filesArray = allFiles ? (Array.isArray(allFiles) ? allFiles : Object.values(allFiles)) : [];

  useEffect(() => {
    if (allFiles) setIsMounted(true)
  }, [allFiles])
  const categorizedFiles = categorizeFiles(filesArray);
  if (!isMounted) return (
    <CustomSpinner />
  )
  return (
    <div className="container p-2 bg-gray-100 text-[#232323] h-full overflow-y-scroll scrollbar-y max-h-[75dvh]">
      <Toaster message={'View your Files'} iconType={'info'} duration={'2000'} />
      <div className="flex flex-col ">
        <p className="text-center my-5 py-2 px-3 self-center rounded-md shadow-lg border border-gray-300 w-1/4">My Files</p>
        {error && (
          <div className="flex flex-col items-start fixed z-20 sm:w-[45vw] w-[80vw] sm:p-0 px-2 mx-auto mt-10">
            <div onClick={(e) => setError('')} className="flex cursor-pointer">
              <i className="fa-solid fa-xmark mx-2 text-red-500 text-sm"></i>
            </div>
            <div className="text-red-500 text-center bg-white w-full p-2 text-md">{error}</div>
          </div>
        )}
        {downloading && (
          <div className="flex flex-col items-start fixed z-20 sm:w-[45vw] w-[80vw] sm:p-0 px-2 mx-auto mt-10">
            <div onClick={(e) => setDownloading(false)} className="flex cursor-pointer">
              <i className="fa-solid fa-xmark mx-2 text-blue-500 text-sm"></i>
            </div>
            <div className="text-blue-500 text-center flex flex-row mx-auto bg-white w-full p-2 text-md items-center">
              <div className="ml-2 mr-5 w-[1.5rem] h-[1.5rem] rounded-[50%] border-blue-500 border-[.2rem] border-t-[transparent] animate-spin"></div>
              <p className=''>Downloading...</p>
            </div>
          </div>
        )}
        <p className="text-start mx-3 mt-2">Images: <span className="text-sm">{categorizedFiles.images.length}</span></p>
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {categorizedFiles.images.length > 0 ? categorizedFiles.images.map((file) => renderFileCard(file, ImageComponent, '#36A2EB', '#36A2EB')) : <p className="mx-3">No image files</p>}
        </div>

        <p className="text-start mx-3 mt-2">Documents: <span className="text-sm">{categorizedFiles.documents.length}</span></p>
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {categorizedFiles.documents.length > 0 ? categorizedFiles.documents.map((file) => renderFileCard(file, DocComponent, '#FF6384', '#FF6384')) : <p className="mx-3">No document files</p>}
        </div>

        <p className="text-start mx-3">Audio: <span className="text-sm">{categorizedFiles.audio.length}</span></p>
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {categorizedFiles.audio.length > 0 ? categorizedFiles.audio.map((file) => renderFileCard(file, AudioComponent, '#4BC0C0', '#4BC0C0')) : <p className="mx-3">No audio files</p>}
        </div>

        <p className="text-start mx-3 mt-2">Video: <span className="text-sm">{categorizedFiles.video.length}</span></p>
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {categorizedFiles.video.length > 0 ? categorizedFiles.video.map((file) => renderFileCard(file, VideoComponent, '#FFCE56', '#FFCE56')) : <p className="mx-3">No video files</p>}
        </div>

        <p className="text-start mx-3 mt-2">Others: <span className="text-sm">{categorizedFiles.others.length}</span></p>
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {categorizedFiles.others.length > 0 ? categorizedFiles.others.map((file) => renderFileCard(file, OthersComponent, '#9966FF', '#9966FF')) : <p className="mx-3">No other files</p>}
        </div>
      </div>
    </div>
  );
}

export default Files;
