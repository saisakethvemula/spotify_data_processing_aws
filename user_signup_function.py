import json
import boto3
from boto3.dynamodb.conditions import Key

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table("user")
def lambda_handler(event, context):
    response = user_table.query(
        KeyConditionExpression=Key('email_id').eq(event["email_id"])
    ) 
    if response['Count'] > 0:
        return "existing"

    user_table.put_item(
        Item={
            "email_id":event["email_id"],
            "password":event["password"]
        }
    )
    return "added"    

    # response = user_table.scan()
    # users = response["Items"]
    # for user in users:
    #     if user["email_id"] == event["email_id"]:
    #         return "existing"
    # user_table.put_item(
    #     Item={
    #         "email_id":event["email_id"],
    #         "password":event["password"]
    #     }
    # )
    # return "added"
