import { Client, Databases, Storage } from 'appwrite';
import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Audio as AudioComponent, Doc as DocComponent, Images as ImagesComponent, Others as OthersComponent, Video as VideoComponent } from '../../assets/google/Icons';
import conf from '../../conf/conf';

function Insights() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [filesData, setFilesData] = useState([0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const client = new Client();
  client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

  const databases = new Databases(client);
  const storage = new Storage(client);
  const categories = {
    Documents: 0,
    Images: 0,
    Video: 0,
    Audio: 0,
    Others: 0,
  };

  useEffect(() => {
    const fetchFilesData = async () => {
      const getFiles = async () => {
        const response = await storage.listFiles(
          conf.appwriteBucketId,
        );
        return response;
      }

      const getDocs = async () => {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
        );
        return response
      }

      const userFiles = async () => {
        const files = await getFiles()
        const docs = await getDocs()

        const dbFiles = await files.files

        const getUserDocs = async () => {
          let arr = []
          docs.documents.forEach((doc) => {
            if (JSON.parse(doc.metaData).user === userData.$id) {
              arr.push(doc)
            }
          })
          return arr
        }
        const userDocs = await getUserDocs()

        // console.log(dbFiles, userDocs);

        const filteredFiles = dbFiles.filter(file => userDocs.some(doc => doc.fileId === file.$id));
        console.log(filteredFiles.length);
        setTotal(filteredFiles.length)

        // filteredFiles.forEach((file) => {
        //   console.log(file.mimeType);
        // })

        filteredFiles.forEach(file => {
          const type = file.mimeType;

          if (type.includes('image')) {
            categories.Images += 1;
          } else if (type.includes('video')) {
            categories.Video += 1;
          } else if (type.includes('audio')) {
            categories.Audio += 1;
          } else if (type.includes('document') || type.includes('text') || type.includes('pdf') || type.includes('word') || type.includes('excel') || type.includes('powerpoint')) {
            categories.Documents += 1;
          } else {
            categories.Others += 1;
          }
        });

        setFilesData([
          categories.Documents,
          categories.Images,
          categories.Video,
          categories.Audio,
          categories.Others,
        ]);


      }
      userFiles()
    };

    fetchFilesData();
  }, [userData]);



  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['Documents', 'Images', 'Video', 'Audio', 'Others'],
      datasets: [
        {
          label: 'Files',
          data: filesData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: ['#000'],
          borderWidth: 0.1,
        },
      ],
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }, [filesData]);

  return (
    <div className="container flex flex-col justify-around items-center h-full w-full">
      <p className="my-1 p-2 self-start rounded-md shadow-lg">Total files :<span className="border m-2 p-1 rounded-md shadow-inner shadow-lg border-gray-700">{total}</span></p>
      <div className="flex flex-col justify-around items-center h-full w-full p-3 mt-2 rounded-md shadow-lg">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex flex-row justify-around items-center gap-2 p-2 rounded-md shadow-xl">
        <div className="flex flex-col mt-2">
          <DocComponent />
          <p className="text-center">{filesData[0]}</p>
        </div>
        <div className="flex flex-col mt-2">
          <ImagesComponent />
          <p className="text-center">{filesData[1]}</p>
        </div>
        <div className="flex flex-col mt-2">
          <VideoComponent />
          <p className="text-center">{filesData[2]}</p>
        </div>
        <div className="flex flex-col mt-2">
          <AudioComponent />
          <p className="text-center">{filesData[3]}</p>
        </div>
        <div className="flex flex-col mt-2">
          <OthersComponent />
          <p className="text-center">{filesData[4]}</p>
        </div>
      </div>
    </div>
  );
}

export default Insights;