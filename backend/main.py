from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64

# Initialize FastAPI app
app = FastAPI()

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
    #print(data.get('image'))
    global count 
    count += 1
    with open("imageToSave" + str(count) +".png", "wb") as fh:
        fh.write(base64.decodebytes(data.get('image').encode()))
    return {"message": "Image received"}
    
    