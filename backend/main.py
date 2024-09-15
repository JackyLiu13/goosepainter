from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import os
import groqhelp

# Initialize FastAPI app
app = FastAPI()
print(os.getcwd())
# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

class Item(BaseModel):
    name: str
    description: str = None

@app.post("/items/")
def create_item(item: Item):
    return {"message": f"Item received: {item.name}", "description": item.description}

@app.get("/test")
def read_test():
    return {"message": "Hello, Test!"}

count = 0 

@app.post('/image')
async def grab_image(data: dict):
    count = 0
    for file in os.listdir('./images'):
        if file[-3:] == "png":
            count += 1
    
    with open("./images/imageToSave" + str(count) +".png", "wb") as fh:
        fh.write(base64.decodebytes(data.get('image').encode()))
    
    groqhelp.get_image_descriptions()
    
    return {"message": "Image received"}
    
    