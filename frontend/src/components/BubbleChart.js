import React from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart = (props) => {
  const { data } = props;

  const chartData = {
    datasets: [
      {
        label: 'Album popularity',
        data: data.map(([date, x, y]) => ({ x: parseInt(date.substring(0, 4)), y, r: x })),
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
          scaleLabel: {
            display: true,
            labelString: 'Year',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Score',
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 100,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          const label = data.labels[tooltipItem.index];
          const value = tooltipItem.value;
          return `${datasetLabel} (${label}): ${value}`;
        },
      },
    },
  };

  return (
    <div>
      <h2>Bubble Chart</h2>
      <Bubble data={chartData} options={chartOptions} />
    </div>
  );
};

export default BubbleChart;
