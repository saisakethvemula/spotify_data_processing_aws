import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

const Histogram = (props) => {
  const { data } = props;
  console.log(data)

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Frequency of albums released',
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Histogram</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Histogram;
