import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlot = (props) => {
  const { data } = props;
  const xData = data[0]
  const yData = data[1]
  console.log(xData,yData)
  const chartData = {
    datasets: [
      {
        label: 'Popularity vs Duration(ms)',
        data: xData.map((value, index) => ({ x: value, y: yData[index] })),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Scatter Plot</h2>
      <Scatter data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScatterPlot;