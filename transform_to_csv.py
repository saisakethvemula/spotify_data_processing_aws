# identifying and importing the necessary libraries
import json
import os
import boto3
from datetime import datetime
import pandas as pd
from io import StringIO

# function to make csv file for album data with only necessary fields
# coded by Ali Khan
def album(data):
    album_data = []
    for row in data['items']:
        album_id = row['track']['album']['id']
        album_name = row['track']['album']['name']
        album_release_date = row['track']['album']['release_date']
        week_number = datetime.now().isocalendar()[1]
        album_total_tracks = row['track']['album']['total_tracks']
        album_url = row['track']['album']['external_urls']['spotify']
        for key, value in row.items():
            if key == "track":
                for artist in value['artists']:
                    artist_id = artist['id']
        album_element = {'album_id':album_id,'name':album_name,'release_date':album_release_date,
        'week_number':week_number,'total_tracks':album_total_tracks,'artist_id':artist_id,'url':album_url}
        album_data.append(album_element)
    return album_data

# function to make csv file for artist data with only necessary fields 
# coded by Vemula Sai Saketh
def artist(data):
    artist_data = []
    for row in data['items']:
        for key, value in row.items():
            if key == "track":
                for artist in value['artists']:
                    artist_dict = {'artist_id':artist['id'], 'artist_name':artist['name'], 'external_url': artist['href']}
                    artist_data.append(artist_dict)
    return artist_data

# function to make csv file for songs data with only necessary fields             
# coded by Vemula Sai Saketh
def song(data):
    song_data = []
    for row in data['items']:
        song_id = row['track']['id']
        song_name = row['track']['name']
        song_duration = row['track']['duration_ms']
        song_url = row['track']['external_urls']['spotify']
        song_popularity = row['track']['popularity']
        song_added = row['added_at']
        album_id = row['track']['album']['id']
        artist_id = row['track']['album']['artists'][0]['id']
        song_element = {'song_id':song_id,'song_name':song_name,'duration_ms':song_duration,'url':song_url,
                        'popularity':song_popularity,'song_added':song_added,'album_id':album_id,
                        'artist_id':artist_id
                       }
        song_data.append(song_element)
    return song_data

spotify_keys=[]
spotify_data = []
# main function
def lambda_handler(event, context):
    # connecting to s3
    s3 = boto3.client('s3')
    Bucket="spotify-etl-project",
    key = "raw_data/to_processed/"
    # using the generated csv in previous part taking those fields which we feel are necessary
    # coded by Ali Khan
    for file in s3.list_objects(Bucket='spotify-etl-project',Prefix=key)['Contents']:
        file_key = file['Key']
        if file_key.split('.')[-1]=="json":
            response = s3.get_object(Bucket='spotify-etl-project',Key=file_key)
            content = response['Body']
            jsonObject = json.loads(content.read())
            spotify_data.append(jsonObject)
            spotify_keys.append(file_key)

    week_number = datetime.now().isocalendar()[1]
    album_data, artist_data, song_data = [], [], []

    # separating the data into album, artist and songs
    for data in spotify_data:
        album_data += album(data)
        artist_data += artist(data)
        song_data += song(data)

    # with the return values dropping any duplicate values and formatting datetime
    # coded by Vemula Sai Saketh
    album_df = pd.DataFrame.from_dict(album_data)
    album_df = album_df.drop_duplicates(subset=['album_id'])
    song_df = pd.DataFrame.from_dict(song_data)
    artist_df = pd.DataFrame.from_dict(artist_data)
    artist_df = artist_df.drop_duplicates(subset=['artist_id'])
    album_df['release_date'] = pd.to_datetime(album_df['release_date'])
    song_df['song_added'] =  pd.to_datetime(song_df['song_added'])

    # putting the data into an intermediate csv file separate for album, artist and songs
    # coded by Ali Khan
    try:
        artist_key = 'transformed_data/artist_data/to_db/artist_transformed_'+str(week_number)+'.csv'
        buffer_artist = StringIO()
        artist_df.to_csv(buffer_artist, index=False)
        content = buffer_artist.getvalue()
        s3.put_object(Bucket='spotify-etl-project', Key=artist_key, Body=content)
    except Exception as e:
        print(f"Error: {e}")
        raise e
    
    # coded by Vemula Sai Saketh
    try:
        album_key = 'transformed_data/album_data/to_db/album_transformed_'+str(week_number)+'.csv'
        buffer_album = StringIO()
        album_df.to_csv(buffer_album, index=False)
        content = buffer_album.getvalue()
        s3.put_object(Bucket='spotify-etl-project', Key=album_key, Body=content)
    except Exception as e:
        print(f"Error: {e}")
        raise e

    # coded by Ali Khan
    try:
        song_key = 'transformed_data/songs_data/to_db/song_transformed_'+str(week_number)+'.csv'
        buffer_s = StringIO()
        song_df.to_csv(buffer_s, index=False)
        content = buffer_s.getvalue()
        s3.put_object(Bucket='spotify-etl-project', Key=song_key, Body=content)
    except Exception as e:
        print(f"Error: {e}")
        raise e

    #Move processed files to a new folder
    # coded by Vemula Sai Saketh
    s3_resource = boto3.resource('s3')
    for file in s3.list_objects(Bucket='spotify-etl-project', Prefix=key)['Contents']:
        file_key = file['Key']
        if file_key.split('.')[-1] == "json":
            copy_source = {'Bucket':'spotify-etl-project', 'Key':file_key}
            s3_resource.meta.client.copy(CopySource=copy_source, Bucket='spotify-etl-project', Key='raw_data/processed/' + file_key.split("/")[-1])
            s3_resource.Object('spotify-etl-project', file_key).delete()
