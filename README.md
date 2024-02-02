# Serverless application for Spotify Data Processing on AWS 

** New Update **

I have discovered better AWS services to automate this pipeline and use it on large scale. I am currently working on using Glue to create ETL jobs to Extract csv data from S3 bucket, create a data catalog for the data, Transform it using PySpark on Glue job and transform the output to a parquet file and push it to DynamoDB or S3. I am keen on using Athena to query our data. This would still be scheduled to run once new weekly data comes in and is transformed for our usecase.

****

Objective:
The objective of this project is to create a scalable, secure, and efficient data pipeline that extracts, transforms, and loads data from the Spotify API into a normalized DynamoDB database, and makes it available for visualization and analysis on the front end. By doing so, we aim to provide an accessible and user-friendly way of analyzing Spotify data, which can be used by individuals and organizations to gain insights into their music preferences and behaviors. Additionally, the project aims to demonstrate how various AWS services can be used together to create a reliable and efficient data pipeline, which can be adapted to different use cases and industries. Ultimately, the goal is to provide a valuable tool for music enthusiasts and professionals alike, while also showcasing the power and versatility of AWS services.

USefulness:
The above project can be useful in several ways. First, it provides a reliable and efficient way of accessing and analyzing data from the Spotify API, which can be used by individuals and organizations to gain insights into their music preferences and behaviors. This can be particularly useful for music enthusiasts, marketers, and researchers who want to understand trends, patterns, and behaviors in the music industry. Second, the interactive interface provided by the project makes it easy for users to visualize and analyze the data in various formats, such as line charts, bar charts, and pie charts. This can be beneficial for users who want to explore the data in different ways and gain a deeper understanding of their music habits. Third, the project showcases the power and versatility of AWS services and provides a blueprint for creating similar data pipelines in other industries and use cases. This can be useful for developers and organizations who want to leverage AWS services for their data needs and build scalable and reliable applications. However, the above project differs from these databases in several ways. First, it uses the latest data from the Spotify API, which provides real-time and accurate data on music preferences and behaviors. Second, the project is built on AWS services, which provides scalability, reliability, and security for the data pipeline. Third, the interactive interface provided by the project makes it easy for users to visualize and analyze the data in different formats, which can be beneficial for gaining insights and making data-driven decisions. The target user group for the database application is music enthusiasts, marketers, and researchers who want to gain insights into their music preferences and behaviors.

Project Summary:
This project involves using various AWS services to extract and transform data from the Spotify API, store it in S3, and then load it into a normalized DynamoDB database. The data is accessed through an API Gateway and visualized on the front end using HTML, CSS, and Chart.js. The process starts by hitting the Spotify API using AWS Lambda and retrieving the data in JSON format. This data is then converted into CSV and stored in an S3 bucket, with this process being executed on a weekly basis using EventBridge. The CSV data is then transformed into different tables that are normalized and optimized for querying, with this transformation process also being executed using AWS Lambda. Once the data is transformed and stored in DynamoDB, it can be accessed through an API Gateway, which provides a secure and scalable way of accessing the data. The front end of the application is built using HTML, CSS, and JavaScript, with Chart.js being used to visualize the data in various formats, such as line charts, bar charts, and pie charts. Overall, this project demonstrates how various AWS services can be used together to create a scalable, secure, and efficient data pipeline that extracts, transforms, and loads data from external sources and makes it available for visualization and analysis on the front end.

Data Description:
Json data description:
This is a JSON object that contains information about a track on the music streaming platform, Spotify. The added_at field indicates the date and time the track was added to a playlist. The added_by field contains information about the user who added the track to the playlist, including their ID, URI, and external URLs. The is_local field is a boolean value that indicates whether the track is a local file or a Spotify track. The primary_color field is a hexadecimal color value that represents the primary color of the album cover art. If there is no album cover art, this field will be null. The track field contains information about the track itself, including the album it is on, its popularity, and its duration. In this example, the album field contains information about the album, including its type (single), the artist(s), and the album's available markets. The available_markets field is an array of ISO 3166-1 alpha-2 country codes where the album is available. Finally, the external_urls field contains a Spotify URL for the album.
The normalized version of the three tables that will be in dynamodb would be as follows:
Album Table:
album_id (Primary Key)
name
release_date
total_tracks
artist_id (Foreign Key)
Artist Table:

artist_id (Primary Key)
artist_name
external_url
Song Table:

song_id (Primary Key)
song_name
duration_ms
url
popularity
song_added
album_id (Foreign Key)
artist_id (Foreign Key)
In this normalized version, each table represents a separate entity and has a primary key that uniquely identifies each record in the table. The Album and Artist tables have a one-to-many relationship, where an album can have only one artist but an artist can have many albums. The Song table has a many-to-one relationship with both the Album and Artist tables, where a song can belong to only one album and one artist, but an album or an artist can have many songs. This design reduces data redundancy and ensures data integrity while making it easier to update, delete, and insert data in the tables.
