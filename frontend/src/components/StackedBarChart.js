import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = (props) => {
  const { data } = props;
  console.log(data)
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Popularity',
        data: Object.values(data),
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
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Stacked Bar Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default StackedBarChart;
