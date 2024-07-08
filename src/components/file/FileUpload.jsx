import { Client, Databases, ID, Storage } from 'appwrite';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import conf from '../../conf/conf';
import { FullLoader } from '../components';

function FileUpload() {
  const { status, userData } = useSelector((state) => state.auth)
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const d = new Date()

  const types = [
    'image/png', 'image/jpeg', 'image/jpg',
    'image/gif', 'image/bmp', 'image/svg+xml',
    'application/pdf', 'text/plain', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip', 'application/x-rar-compressed'
  ];

  const client = new Client();
  client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

  const storage = new Storage(client);
  const databases = new Databases(client);

  const uploadFile = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!file) {
        throw new Error('No file selected');
      }

      if (!types.includes(file.type)) {
        throw new Error('Unsupported file type');
      }

      const fileResponse = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );

      const fileId = fileResponse.$id;
      const metaData = JSON.stringify({
        user: userData,
        description: description,
        date: {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
        },
        time: {
          hours: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds()
        }
      })

      const metadataResponse = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          fileId,
          metaData,
        }
      );
      console.log('File and metadata uploaded successfully:', { fileResponse, metadataResponse });
      setFile(null)
      setDescription('')
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      {loading ? <FullLoader message='Uploading file...' /> : null}
      <div className="flex flex-col justify-around">
        <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300 w-1/4 self-center">
          Upload file
        </p>
        <form onSubmit={uploadFile} className="upload-form px-2 py-10 border border-gray-500 rounded-lg justify-between">
          <div className='flex flex-col gap-3 mb-2'>
            <label htmlFor="file" >File</label>
            <input type="file" id="file" onChange={handleFileChange} required className='p-2 text-white bg-teal-400 text-sm rounded-md cursor-pointer hover:bg-teal-500 active:bg-teal-300 transition-all duration-200' />
          </div>
          {/* <hr className='border border-t-gray-800 m-2' /> */}
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
          <button type="submit" disabled={loading} className='py-1 rounded-[2rem] mx-2 my-1 bg-green-500 active:bg-green-500 transition-all duration-200 hover:bg-green-400 text-white px-4'>
            Upload<i class="fa-solid fa-upload text-white mx-2 text-sm"></i>
          </button>
          <button className="py-1 px-4 bg-red-600 hover:bg-red-500 active:bg-red-600 transition-all duration-200 text-white rounded-[2rem] mx-2 my-1 cursor-pointer">Cancel<i class="fa-solid fa-xmark mx-2 text-white text-sm"></i></button>
        </form>
      </div>
    </>
  );
}

export default FileUpload;
