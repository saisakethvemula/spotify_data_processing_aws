import React from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SongList from './pages/Playlist';
import Visualizations from './pages/Visualizations';

export default function App() {
  return (
    <div className="App">
		<Routes>
			<Route exact path="/" element={ <Dashboard/> } />
			<Route path='playlist' element={ <SongList/> } />
			<Route path='visualizations' element={ <Visualizations/> } />
		</Routes>
    </div>
  );
}