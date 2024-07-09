import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useUserFiles from '../../hooks/useUserFiles';
import { Toaster } from '../components';

function Statistics() {
  const { userData } = useSelector((state) => state.auth)
  const { allFiles, total } = useUserFiles(userData)
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [toaster, setToaster] = useState(false)
  const [moreToast, setMoreToast] = useState(false)
  const d = new Date()


  useEffect(() => {

    function loger(files) {
      files.forEach((file) => {
        console.log(file);
      })
    }

    const filesArray = allFiles ? (Array.isArray(allFiles) ? allFiles : Object.values(allFiles)) : [];
    console.log(d.getUTCDay())
    loger(filesArray)

    const handleToaster = () => {
      setTimeout(() => {
        setToaster(true)
      }, 1000)
      setToaster(false)
      setTimeout(() => {
        setMoreToast(true)
      }, 3000)
      setMoreToast(false)
    }
    handleToaster()

    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Files Per Day',
          data: [2, 12, 8, 8, 6, 7, 3],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
      ],
    };

    const options = {
      onClick: (e) => {
        const canvasPosition = getRelativePosition(e, chartInstanceRef.current);

        // Substitute the appropriate scale IDs
        const dataX = chartInstanceRef.current.scales.x.getValueForPixel(canvasPosition.x);
        const dataY = chartInstanceRef.current.scales.y.getValueForPixel(canvasPosition.y);
        console.log('Data X:', dataX, 'Data Y:', dataY);
      },
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-between items-center">
      {
        toaster && (
          <Toaster message={'View your Statistics'} iconType={'info'} duration={'2000'} />
        )
      }
      {
        moreToast && (
          <Toaster message={'More Insights'} iconType={'info'} duration={'2000'} />
        )
      }
      <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300">Statistics</p>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-center">Your activity through the week.</p>
        <canvas ref={chartRef} className='m-2 border border-gray-300 p-2 rounded-md shadow-lg'></canvas>
      </div>
    </div>
  );
}

export default Statistics;
