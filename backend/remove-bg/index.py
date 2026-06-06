"""
Удаляет фон с изображения по URL через remove.bg API и сохраняет результат в S3.
"""
import os
import boto3
import requests
import json
def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    image_url = body.get("image_url")
    output_key = body.get("output_key")

    if not image_url or not output_key:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "image_url and output_key required"})}

    api_key = os.environ["REMOVE_BG_API_KEY"]

    img_data = requests.get(image_url, timeout=15).content

    response = requests.post(
        "https://api.remove.bg/v1.0/removebg",
        files={"image_file": ("photo.jpg", img_data, "image/jpeg")},
        data={"size": "auto"},
        headers={"X-Api-Key": api_key},
        timeout=25,
    )

    if response.status_code != 200:
        return {"statusCode": 500, "headers": cors, "body": json.dumps({"error": f"remove.bg error: {response.text}"})}

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    s3.put_object(
        Bucket="files",
        Key=output_key,
        Body=response.content,
        ContentType="image/png",
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{output_key}"

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"url": cdn_url}),
    }