import React, { useState } from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = (props) => {
  const { data } = props;
  console.log(data)
  const [selectedArtist, setSelectedArtist] = useState("");
  
  const handleArtistChange = (event) => {
    setSelectedArtist(event.target.value);
  };

  const artistData = data[selectedArtist];

  const chartData = {
    labels: artistData ? artistData.map((song) => song.song) : [],
    datasets: [
      {
        label: "Popularity",
        data: artistData ? artistData.map((song) => song.popularity) : [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100,
        min: 0,
        stepSize: 20,
      },
    },
  };

  return (
    <div>
      <label>
        {/* Select an artist: */}
        <select value={selectedArtist} onChange={handleArtistChange}>
          <option value="">Please select an artist</option>
          {Object.keys(data).map((artistName) => (
            <option value={artistName} key={artistName}>
              {artistName}
            </option>
          ))}
        </select>
      </label>
      {artistData ? (
        <Radar data={chartData} options={chartOptions} />
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
};

export default RadarChart;