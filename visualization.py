import json
import boto3
from boto3.dynamodb.conditions import Key

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
album_table = dynamodb.Table("album")
artist_table = dynamodb.Table("artist")
song_table = dynamodb.Table("songs")

def lambda_handler(event, context):
    response = album_table.scan()
    release_dates = {}
    ret = {}
    
    for item in response['Items']:
        release_date = item['release_date']
        if release_date in release_dates:
            release_dates[release_date] += 1
        else:
            release_dates[release_date] = 1
            
    ret["histogram"] = release_dates
    
    popularity = []
    duration = []
    response = song_table.scan()
    for item in response['Items']:
        duration.append(item['duration_ms'])
        popularity.append(item['popularity'])
        
    ret["scatter"] = [duration, popularity]
    
    
    # response = artist_table.scan()
    # artists = response['Items']
    # response = song_table.scan()
    # songs = response['Items']
    artist_popularity = {}

    for album in response['Items']:
        # get the album's artist ID
        artist_id = album['artist_id']
        
        # query the song table for all songs in the album
        response = song_table.query(
            KeyConditionExpression=Key('album_id').eq(album['album_id'])
        )
        
        # iterate over the songs
        for song in response['Items']:
            # get the song's popularity
            popularity = song['popularity']
            
            # add the song's popularity to the artist's total popularity
            if artist_id in artist_popularity:
                artist_popularity[artist_id] += popularity
            else:
                artist_popularity[artist_id] = popularity
    
    # for artist in artists:
        
    #     # # Get all songs by the artist
    #     # response = song_table.query(
    #     #     IndexName='artist_id-index',
    #     #     KeyConditionExpression='artist_id = :a',
    #     #     ExpressionAttributeValues={
    #     #         ':a': artist['artist_id']
    #     #     }
    #     # )
        
    #     # songs = response['Items']
    #     total_popularity = 0
    #     for song in songs:
    #         if song["artist_id"] == artist["artist_id"]:
    #             total_popularity += song["popularity"]
        
    #     # Calculate total popularity of all songs by the artist
    #     # total_popularity = sum(song['popularity'] for song in songs)
        
    #     # Store popularity of songs by the artist in the dictionary
    #     popularity_by_artist[artist['artist_name']] = total_popularity

    ret["stacked"] = artist_popularity
    
    # # Query the Album table to get all albums with release date, popularity, and total tracks
    # albums = album_table.scan(
    #     ProjectionExpression='album_id, release_date, total_tracks',
    #     Select='SPECIFIC_ATTRIBUTES'
    # )['Items']
    
    # # Get the album popularity for each album by querying the Song table and aggregating the song popularity
    # for album in albums:
    #     response = song_table.query(
    #         KeyConditionExpression=Key('album_id').eq(album['album_id']),
    #         ProjectionExpression='popularity',
    #         Select='SPECIFIC_ATTRIBUTES'
    #     )
    #     album['popularity'] = sum([song['popularity'] for song in response['Items']])
    
    # # Sort the albums by release date
    # albums.sort(key=lambda x: x['release_date'])
    
    # # Create a list of tuples with release date, popularity, and total tracks for each album
    # album_data = [(album['release_date'], album['popularity'], album['total_tracks']) for album in albums]

    response = album_table.scan()
    album_popularity = {}
    for album in response['Items']:
        response = song_table.query(
            KeyConditionExpression=Key('album_id').eq(album['album_id'])
        )
        
        for song in response['Items']:
            # get the song popularity
            popularity = song['popularity']
            
            # albums total popularity
            if album['album_id'] in album_popularity:
                album_popularity[album['album_id']] += popularity
            else:
                album_popularity[album['album_id']] = popularity
        
        album_popularity[album['album_id']] = {
            'release_date': album['release_date'],
            'popularity': album_popularity[album['album_id']],
            'total_tracks': album['total_tracks']
        }
    
    # album_popularity = []
    # response = album_table.scan()
    # albums = response["Items"]
    # for album in albums:
    #     release_date = album["release_date"]
    #     total_tracks = album["total_tracks"]
    #     popularity = 0
    #     for song in songs:
    #         if song["album_id"] == album["album_id"]:
    #             popularity += song["popularity"]
    #     album_popularity.append([release_date,total_tracks,popularity])
    
    ret["bubble"] = album_popularity
    
    artist_top_songs = {}
    response = artist_table.scan()
    for artist in response['Items']:
        response = song_table.query(
            IndexName='artist_id-popularity-index',
            KeyConditionExpression=Key('artist_id').eq(artist['artist_id']),
            ScanIndexForward=False,
            Limit=10)

        response.sort(key=lambda x: x['popularity'], reverse=True)
        artist_top_songs[artist["artist_name"]] = response[:10]

    # artist_top_songs = {}
    
    # for artist in artists:
    #     # temp = {"artist":artist["artist_name"]}
    #     temp2 = []
    #     for song in songs:
    #         if song["artist_id"] == artist["artist_id"]:
    #             temp2.append({"song":song["song_name"], "popularity":song["popularity"]})
    #     if len(temp2) == 0:
    #         continue
                
    #     temp2.sort(key=lambda x: x['popularity'], reverse=True)
    #     # artist_top_songs.append({artist["artist_name"]:temp2[:10]})
    #     artist_top_songs[artist["artist_name"]] = temp2[:10]

    ret["radar"] = artist_top_songs
    
    return ret
    
