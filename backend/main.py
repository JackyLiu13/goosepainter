from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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