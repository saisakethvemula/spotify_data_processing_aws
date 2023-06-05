import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SongList.css";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function formatDuration(milliseconds) {
	const minutes = Math.floor(milliseconds / 60000);
	const seconds = Math.floor((milliseconds % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
  

const SongList = () => {
	const location = useLocation();
    const email_id = location.state.email;
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		axios.post("https://clmqbf5t2h.execute-api.us-east-1.amazonaws.com/fav_main", {email_id: email_id, song_id: ""})
		.then(response => {
			const favorite_songs = response.data
			console.log(favorite_songs)
			axios.get("https://cxvk7cmck9.execute-api.us-east-1.amazonaws.com/staging")
			.then(response => {
				console.log(response.data)
				const resp_songs = response.data
				const formattedSongs = resp_songs.map(song => ({
					...song,
					duration: formatDuration(song.duration),
					isFavorite: favorite_songs.includes(song.song_id)
				}));
				setSongs(formattedSongs)
			})
			.catch(error => console.log(error));
		})
		.catch(error => console.log(error));

	}, [email_id]);
  
    const handleAddToFavorites = (id) => {
      const updatedSongs = songs.map((song) => {
        if (song.song_id === id) {
          return { ...song, isFavorite: true };
        }
        return song;
      });
      setSongs(updatedSongs);
	  axios.post("https://clmqbf5t2h.execute-api.us-east-1.amazonaws.com/fav_main", {email_id: email_id, song_id: id})
	  .then(response => {
		console.log(response)
	  })
	  .catch(error => console.log(error));
    };
  
    const handleRemoveFromFavorites = (id) => {
      const updatedSongs = songs.map((song) => {
        if (song.song_id === id) {
          return { ...song, isFavorite: false };
        }
        return song;
      });
      setSongs(updatedSongs);
	  axios.post("https://clmqbf5t2h.execute-api.us-east-1.amazonaws.com/fav_main", {email_id: email_id, song_id: id})
	  .then(response => {
		console.log(response)
	  })
	  .catch(error => console.log(error));
    };


    return (
        <div>
            <nav style={{ backgroundColor: "#1DB954", height: "50px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
                <Link to="/" style={{ color: "#191414", textDecoration: "none", margin: "0 20px", fontSize: "24px" }}>
                  MySpotify
                </Link>
                <Link to="/visualizations" state={{email:email_id}} style={{ color: "#191414", textDecoration: "none", margin: "0 20px", fontSize: "20px" }}>
                  Visualizations
                </Link>
              </div>
            </nav>
            <div className="songlist-container">
                <h2>Most played songs this week</h2>
                <table className="songlist">
                    <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Artist Name</th>
						            <th>Album Name</th>
                        <th>Song Duration</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songs.map((song) => (
                        <tr key={song.song_id}>
                        <td>{song.song}</td>
                        <td>{song.artist}</td>
						<td>{song.album}</td>
                        <td>{song.duration}</td>
                        <td>
                            {song.isFavorite ? (
                            <>
                                <button
                                className="songlist-item-remove-from-favorites"
                                onClick={() => handleRemoveFromFavorites(song.song_id)}
                                >
                                Unfavorite
                                </button>
                            </>
                            ) : (
                            <button
                                className="songlist-item-add-to-favorites"
                                onClick={() => handleAddToFavorites(song.song_id)}
                            >
                                Favorite
                            </button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SongList;
