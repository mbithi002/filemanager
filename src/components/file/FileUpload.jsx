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
        <form onSubmit={uploadFile} className="upload-form">
          <div>
            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={handleFileChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default FileUpload;
