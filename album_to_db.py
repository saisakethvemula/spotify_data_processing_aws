# identifying and importing the necessary libraries
import json
import boto3

# connecting to s3 and dynamodb services using boto3
s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("album")
table2 = dynamodb.Table("artist")
table3 = dynamodb.Table("songs")
# main function
def lambda_handler(event, context):
    Bucket = "spotify-etl-project"
    key = "transformed_data/album_data/to_db/"
    # once the csv files are generated in previous step we will be adding those to dynamodb
    
    for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key)['Contents']:
        file_key = file['Key']
        print(file_key)
        if file_key.split('.')[-1] == "csv":
            response = s3_client.get_object(Bucket=Bucket, Key=file_key)
            data = response['Body'].read().decode("utf-8")
            album = data.split("\n")
            # coded by Vemula Sai Saketh
            for s in album:
                s_data = s.split(",")
                try:
                    print(s_data)
                    table.put_item(
                        Item={
                            "album_id":s_data[0],
                            "name":s_data[1],
                            "release_date":s_data[2],
                            "week_number":s_data[3],
                            "total_tracks":int(s_data[4]),
                            "artist_id":s_data[5],
                            "url":s_data[6]
                        }
                    )
                except Exception as e:
                    print("End of file")
            
            s3_resource = boto3.resource('s3')
            for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key)['Contents']:
                file_key = file['Key']
                if file_key.split('.')[-1] == "csv":
                    copy_source = {'Bucket':'spotify-etl-project', 'Key':file_key}
                    s3_resource.meta.client.copy(CopySource=copy_source, Bucket='spotify-etl-project', Key='transformed_data/album_data/db/' + file_key.split("/")[-1])
                    s3_resource.Object('spotify-etl-project', file_key).delete()
        
    key_artist = "transformed_data/artist_data/to_db/"
    
    for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key_artist)['Contents']:
        file_key = file['Key']
        print(file_key)
        if file_key.split('.')[-1] == "csv":
            response = s3_client.get_object(Bucket=Bucket, Key=file_key)
            data = response['Body'].read().decode("utf-8")
            artist = data.split("\n")
            # coded by Ali Khan
            for s in artist:
                s_data = s.split(",")
                try:
                    print(s_data)
                    table2.put_item(
                        Item={
                            "artist_id":s_data[0],
                            "artist_name":s_data[1],
                            "external_url":s_data[2],
                        }
                    )
                except Exception as e:
                    print("End of file")
            
            s3_resource = boto3.resource('s3')
            for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key_artist)['Contents']:
                file_key = file['Key']
                if file_key.split('.')[-1] == "csv":
                    copy_source = {'Bucket':'spotify-etl-project', 'Key':file_key}
                    s3_resource.meta.client.copy(CopySource=copy_source, Bucket='spotify-etl-project', Key='transformed_data/artist_data/db/' + file_key.split("/")[-1])
                    s3_resource.Object('spotify-etl-project', file_key).delete()
                    
    key_song = "transformed_data/songs_data/to_db/"
    
    for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key_song)['Contents']:
        file_key = file['Key']
        print(file_key)
        if file_key.split('.')[-1] == "csv":
            response = s3_client.get_object(Bucket=Bucket, Key=file_key)
            data = response['Body'].read().decode("utf-8")
            song = data.split("\n")
            for s in song:
                s_data = s.split(",")
                try:
                    print(s_data)
                    # coded by Vemula Sai Saketh
                    table3.put_item(
                        Item={
                            "song_id":s_data[0],
                            "song_name":s_data[1],
                            "duration_ms":int(s_data[2]),
                            "url":s_data[3],
                            "popularity":int(s_data[4]),
                            "song_added":s_data[5],
                            "album_id":s_data[6],
                            "artist_id":s_data[7]
                        }
                    )
                except Exception as e:
                    print("End of file")
            
            # coded by Ali Khan
            s3_resource = boto3.resource('s3')
            for file in s3_client.list_objects(Bucket='spotify-etl-project', Prefix=key_song)['Contents']:
                file_key = file['Key']
                if file_key.split('.')[-1] == "csv":
                    copy_source = {'Bucket':'spotify-etl-project', 'Key':file_key}
                    s3_resource.meta.client.copy(CopySource=copy_source, Bucket='spotify-etl-project', Key='transformed_data/songs_data/db/' + file_key.split("/")[-1])
                    s3_resource.Object('spotify-etl-project', file_key).delete()
                    
    
