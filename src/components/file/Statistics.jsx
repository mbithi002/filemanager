import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import React, { useEffect, useRef } from 'react';

function Statistics() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
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
      <p className="text-center my-5 py-2 px-4 rounded-md shadow-lg border border-gray-300">Statistics</p>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-center">Your activity through the week.</p>
        <canvas ref={chartRef} className='m-2 border border-gray-300 p-2 rounded-md shadow-lg'></canvas>
      </div>
    </div>
  );
}

export default Statistics;
