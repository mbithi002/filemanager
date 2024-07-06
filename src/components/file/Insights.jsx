import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { Audio as AudioComponent, Images as ImagesComponent, Others as OthersComponent, PDF as PDFComponent, Video as VideoComponent } from '../../assets/google/Icons';

function Insights() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [filesData, setFilesData] = useState([0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);

  // fetch filesData from server>>>
  const allFiles = [12, 19, 31, 5, 2];

  useEffect(() => {
    const findTotal = () => {
      let sum = 0;
      allFiles.forEach((item) => {
        sum += item;
      });
      return sum;
    };

    setTotal(findTotal());
    setFilesData(allFiles);
  }, []);

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
          borderColor: [
            '#232323',
          ],
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
          <PDFComponent />
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
