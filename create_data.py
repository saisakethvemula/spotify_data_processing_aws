# identifying and importing the necessary libraries
import json
import os
# spotipy is an opensource python library for connecting to the API server and fetching data
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
# boto3 is AWS's library to connect and utilize their services
import boto3
from datetime import datetime

# main function
def lambda_handler(event, context):
    # using environment variables to store credentials
    # coded by Ali Khan
    client_id = os.environ.get('client_id')
    client_secret = os.environ.get('client_secret')
    client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
    # spotify object to access the data From API using Credentials
    sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)
    playlist_url = 'https://open.spotify.com/playlist/3IsxzDS04BvejFJcQ0iVyW'
    playlist_URI = playlist_url.split("/")[-1]
    data = sp.playlist_tracks(playlist_URI)
    # connecting to s3 client to store data
    # coded by Vemula Sai Saketh
    client = boto3.client('s3')
    week_number = datetime.now().isocalendar()[1]
    filename='Spotify_Raw_'+str(week_number)+'.json'
    # storing the data into csv and saving it in s3
    # coded by Ali Khan
    client.put_object(
        Bucket="spotify-etl-project",
        Key="raw_data/to_processed/"+filename,
        Body=json.dumps(data),
        )
