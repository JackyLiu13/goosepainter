import os
from groq import Groq
import base64
from dotenv import load_dotenv
from typing import List
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import random
import string
from bson import ObjectId  # Assuming you are using PyMongo and BSON types


load_dotenv()
URI = "mongodb+srv://jackyliu013:GPcA0TifXrBaHZlz@goosepainters.corzf.mongodb.net/?retryWrites=true&w=majority&appName=goosepainters"
client = MongoClient(URI, server_api=ServerApi('1'))
db = client['hackthenorth']
collection = db['games'] 


def create_new_game(username: str):
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8)),
    result = collection.insert_one({
        "code": code,
        "users": [{
            "name": username,
            "description": [],
        }],
    })
    inserted_document = collection.find_one({"_id": result.inserted_id})
    
    return {
        "code": inserted_document["code"], 
    }
    
def join_game(code: str, username: str):
    # Find the document matching the code
    result = collection.find_one({"code": code})

    # Check if no document is found
    if not result:
        return {"result": "Game not found"}

    # Append the new user to the 'users' list
    result["users"].append({
        "name": username,
        "description": [],
    })

    # Update the game document in the database with the new user
    collection.update_one(
        {"_id": result["_id"]},
        {"$set": {"users": result["users"]}}
    )

    return {"result": "Success"}  # Return the result with the new user ID

    
def get_image_descriptions(num:int):
    # Fetch the API key from environment variables
    api_key = os.environ.get("GROQ_API_KEY")

    # Initialize the client with the API key
    client = Groq(api_key=api_key)

    image_path = f"imageToSave{num}.png"
    with open("./images/" + image_path, 'rb') as image_file:
        # Convert image to base64
        image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        
    # Create a completion request for each image
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe this image"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{image_base64}"
                        } 
                    }
                ]
            }
        ],
        model="llava-v1.5-7b-4096-preview",
        temperature=0,
        max_tokens=100,
        top_p=1,
        stream=False,
        stop=None, 
    )
    
    # Adding to Mongo
    result = collection.insert_one({
        "users": [],
        "description": completion.choices[0].message.content,
        
    })

    # Print the response from the API
    print(f"Response for {image_path}:")
    print(completion.choices[0].message.content)
    print("-" * 50)  # Divider for better readability
