import { Client, Databases, ID, Storage } from 'appwrite';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import conf from '../../conf/conf';
import { FullLoader, Toaster } from '../components';

function FileUpload() {
  const [error, setError] = useState('');
  const { status, userData } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [toaster, setToaster] = useState({ message: 'Fill up the fields to upload', type: 'info', duration: 2000 })
  const d = new Date();

  const client = new Client();
  client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

  const storage = new Storage(client);
  const databases = new Databases(client);

  const uploadFile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!file) {
        setError('Please Select a File');
        throw new Error('No file selected');
      }

      const fileResponse = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
      if (!fileResponse) {
        setError('Failed to upload');
        throw new Error('Failed to upload file');
      }
      const fileId = fileResponse.$id;

      const previewUrl = storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      ).href;
      setPreview(previewUrl);

      const metaData = JSON.stringify({
        user: userData.$id,
        description: description,
        date: {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          date: d.getDate(),
          day: d.getDay() + 1,
        },
        time: {
          hours: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds()
        }
      });

      const metadataResponse = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          fileId,
          metaData,
        }
      );
      metadataResponse && setToaster({ message: '1 file uploaded', type: 'success', duration: 3000 })
      setFile(null);
      setDescription('');
      setPreview()

    } catch (error) {
      setError(error.message);
      setToaster({ message: 'Failed to upload', type: 'error', duration: 3000 })
      console.error('File upload failed:', error);
    } finally {
      setToaster({ message: '1 file uploaded', type: 'success', duration: 3000 })
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFile(null);
    setDescription('');
    setPreview();
    return;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate a temporary preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  return (
    <>
      {loading ? <FullLoader message='Uploading file...' /> : null}
      <Toaster message={toaster.message} iconType={toaster.type} duration={toaster.duration} />

      <div className="flex flex-col justify-around sm:-mt-0 -mt-[7rem] sm:pt-0 pt-5">
        <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300 sm:w-1/4 w-1/2 self-center">
          Upload file
        </p>
        {error && (
          <div className="flex flex-col items-start">
            <div onClick={(e) => setError('')} className="flex cursor-pointer">
              <i className="fa-solid fa-xmark mx-2 text-red-500 text-sm"></i>
            </div>
            <div className="text-red-500 text-center bg-white w-full p-2 text-md">{error}</div>
          </div>
        )}
        <form onSubmit={uploadFile} className="upload-form px-2 py-10 border border-gray-500 rounded-lg justify-between">
          <div className='flex flex-col gap-3 mb-2'>
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
              className='p-2 text-white bg-teal-400 text-sm rounded-md cursor-pointer hover:bg-teal-500 active:bg-teal-300 transition-all duration-200'
            />
          </div>
          <div>
            <label htmlFor="description" className="m-2 p-1">Description:</label>
            <input
              className='w-full bg-transparent border h-[2rem] my-2 p-2 border-gray-700 rounded-md'
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {preview && (
            <div className="w-[12rem] h-[12rem] self-center p-2 mb-2">
              <p className="text-blue-500">Preview</p>
              <img src={preview} alt="File Preview" className="mx-auto" />
            </div>
          )}
          <button type="submit" disabled={loading} className='py-1 rounded-[2rem] mx-2 my-1 bg-green-500 active:bg-green-500 transition-all duration-200 hover:bg-green-400 text-white px-4'>
            Upload<i className="fa-solid fa-upload text-white mx-2 text-sm"></i>
          </button>
        </form>
        <button
          onClick={handleCancel}
          className="w-1/4 py-1 px-4 bg-red-600 hover:bg-red-500 active:bg-red-600 transition-all duration-200 text-white rounded-[2rem] mx-2 my-1 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default FileUpload;
