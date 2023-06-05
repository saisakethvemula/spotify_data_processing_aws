import json
import boto3

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
album_table = dynamodb.Table("album")
artist_table = dynamodb.Table("artist")
song_table = dynamodb.Table("songs")

def lambda_handler(event, context):
    response = song_table.scan()
    songs = response['Items']
    
    ret = []
    
    while 'LastEvaluatedKey' in response:
        response = song_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        songs.extend(response['Items'])
        
    id = 0
    for song in songs:
        temp = {"song":song['song_name'], "artist":"", "album":"", "duration":0, "song_id":""}
        
        song_name = song['song_name']
        artist_id = song['artist_id']
        album_id = song['album_id']
        duration_ms = song['duration_ms']
        temp["duration"] = duration_ms
        temp["song_id"] = song['song_id']

        # Get artist name from Artist table
        # artist_table = dynamodb.Table('Artist')
        try:
            response = artist_table.get_item(Key={'artist_id': artist_id})
            artist_name = response['Item']['artist_name']
        except:
            continue
        temp["artist"] = artist_name

        # Get album name from Album table
        # album_table = dynamodb.Table('Album')
        response = album_table.get_item(Key={'album_id': album_id})
        album_name = response['Item']['name']
        temp["album"] = album_name
        temp["id"] = id
        id += 1
        ret.append(temp)
        
    return ret
