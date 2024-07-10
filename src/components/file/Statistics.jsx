import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NoData as NoDataComponent } from '../../assets/assets';
import useUserFiles from '../../hooks/useUserFiles';
import { CustomSpinner, Toaster } from '../components';

function Statistics() {
  const { userData } = useSelector((state) => state.auth);
  const { allFiles } = useUserFiles(userData);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [toaster, setToaster] = useState(false);
  const [moreToast, setMoreToast] = useState(false);
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true); // Add loading state
  const chartLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filesArray = allFiles ? (Array.isArray(allFiles) ? allFiles : Object.values(allFiles)) : [];

  useEffect(() => {
    if (!allFiles) return;

    const daysCount = Array(7).fill(0);
    filesArray.forEach((file) => {
      const day = new Date(file.$createdAt).getDay();
      daysCount[day]++;
    });

    setChartData(daysCount);
    setLoading(false); // Set loading to false when data is ready
  }, [filesArray, allFiles]);

  useEffect(() => {
    if (!chartRef.current || loading) return;

    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Files Per Day',
          data: chartData,
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

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, loading]);

  useEffect(() => {
    const handleToaster = () => {
      setTimeout(() => {
        setToaster(true);
      }, 1000);
      setTimeout(() => {
        setToaster(false);
      }, 3000);
      setTimeout(() => {
        setMoreToast(true);
      }, 4000);
      setTimeout(() => {
        setMoreToast(false);
      }, 6000);
    };
    handleToaster();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-center"><CustomSpinner /></p>
      </div>
    );
  }

  if (filesArray.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="animate-bounce">
        <NoDataComponent w='16rem' h='16rem' />
        </div>
        <p className="text-center mt-2" >No recent activity, try uploading some files.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center">
      {toaster && (
        <Toaster message={'View your Statistics'} iconType={'info'} duration={'2000'} />
      )}
      {moreToast && (
        <Toaster message={'More Insights'} iconType={'info'} duration={'2000'} />
      )}
      <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300">Statistics</p>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-center">Your activity through the week.</p>
        <canvas ref={chartRef} className="m-2 border border-gray-300 p-2 rounded-md shadow-lg"></canvas>
      </div>
    </div>
  );
}

export default Statistics;
