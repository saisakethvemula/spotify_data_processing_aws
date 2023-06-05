import json
import boto3
from boto3.dynamodb.conditions import Key

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table("user")
def lambda_handler(event, context):
    response = user_table.query(
        KeyConditionExpression=Key('email_id').eq(event["email_id"]) & Key('password').eq(event["password"])
    )    
    if response['Count'] > 0:
        return "auth"
    
    response = user_table.query(
        KeyConditionExpression=Key('email_id').eq(event["email_id"])
    ) 
    if response['Count'] > 0:
        return "wrong"

    return "noauth"


    # response = user_table.scan()
    # users = response['Items']
    # for user in users:
    #     if user["email_id"] == event["email_id"]:
    #         if user["password"] == event["password"]:
    #             return "auth"
    #         else:
    #             return "wrong"
    # return "noauth"