import React, { useState, useEffect } from "react";
import axios from 'axios';
import Histogram from "../components/Histogram";
import ScatterPlot from "../components/ScatterPlot";
import StackedBarChart from "../components/StackedBarChart";
import BubbleChart from "../components/BubbleChart";
import RadarChart from "../components/RadarChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./Visualization.css"
import { Link, useLocation } from "react-router-dom";

const Visualizations = () => {
	const location = useLocation();
    const email_id = location.state.email;
	const [selectedOption, setSelectedOption] = useState('');

	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get('https://hcfgykdvd5.execute-api.us-east-1.amazonaws.com/main')
		.then(response => {
			setData(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	}, []);

	const handleOptionChange = (e) => {
	  setSelectedOption(e.target.value);
	};
  
	const renderVisualization = () => {
	  switch (selectedOption) {
		case 'histogram':
		  return <Histogram data={data["histogram"]} />;
		case 'scatter':
		  return <ScatterPlot data={data["scatter"]} />;
		case 'stacked-bar':
		  return <StackedBarChart data={data["stacked"]} />;
		case 'bubble':
		  return <BubbleChart data={data["bubble"]} />;
		case 'radar':
		  return <RadarChart data={data["radar"]} />;
		default:
		  return null;
	  }
	};
  
	return (
		<>
		<nav style={{ backgroundColor: "#1DB954", height: "50px" }}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
			<Link to="/" style={{ color: "#191414", textDecoration: "none", margin: "0 20px", fontSize: "24px" }}>
				MySpotify
			</Link>
			<Link to="/playlist" state={{email:email_id}} style={{ color: "#191414", textDecoration: "none", margin: "0 20px", fontSize: "20px" }}>
				Playlist
			</Link>
			</div>
		</nav>
	  	<div className="select-visualization-container">
		<h1>Select Visualization</h1>
		<div className="select-visualization">
		  <select value={selectedOption} onChange={handleOptionChange}>
			<option value="">-- Select an option --</option>
			<option value="histogram">Histogram of album release dates</option>
			<option value="scatter">Scatter plot of song popularity vs. duration</option>
			<option value="stacked-bar">Stacked bar chart showing the popularity of songs by each artist</option>
			<option value="bubble">Bubble chart showing the relationship between album release date, album popularity, and number of tracks</option>
			<option value="radar">Radar chart showing the popularity of an artist's top 10 songs</option>
		  </select>
		  {/* {selectedOption === 'radar' && (
			<select>
			  <option value="">-- Select an artist --</option>
			  <option value="artist1">Artist 1</option>
			  <option value="artist2">Artist 2</option>
			  <option value="artist3">Artist 3</option>
			</select>
		  )} */}
		  {selectedOption && (
			<div className="visualization-display">
			  {renderVisualization()}
			</div>
		  )}
		</div>
	  	</div>
		</>
	);
};

export default Visualizations;
