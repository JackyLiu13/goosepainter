from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere
import base64
# Initialize FastAPI app
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
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

# Initialize Cohere Client with your API Key
co = cohere.Client("e2FG8cmDuOJVluFg34peBFtOHK3Absgefg8BhsvB")  # Replace with your actual API key

# Define the request body structure
class StoryEvaluationRequest(BaseModel):
    theme: str
    generated_story: str

@app.post("/evaluate/")
def evaluate_story(request: StoryEvaluationRequest):
    try:
        # Construct the prompt for the model
        prompt = f"""
        You will receive two inputs: a theme and a generated story. Your task is to evaluate how closely the story aligns with the given theme based on the following criteria:

        Plot Relevance: Assess how much the overall storyline or narrative of the generated story aligns with the theme.
        Imagery and Descriptions: Examine whether the visual or descriptive elements of the story reflect the key elements of the theme.
        Tone and Mood: Determine if the emotional tone or mood of the story matches the feelings or atmosphere the theme would typically inspire.
        Creativity: Consider how uniquely the story interprets the theme.

        Input Structure:
        Theme: "{request.theme}"
        Generated Story: "{request.generated_story}"

        Output Structure:
        Provide a similarity score on a scale from 0 to 100, followed by a breakdown of your evaluation according to the criteria mentioned above. Don't be too generous.
        """

        # Call Cohere API
        response = co.chat(
            message=prompt,
            model="command-light",
            temperature=0.7,
            max_tokens=300
        )

        print("Response from Cohere:", response)  # Log response for debugging

        return {"evaluation": response}
    except Exception as e:
        print(f"Error: {e}")  # Print error
        return {"error": str(e)}, 500  # Return 500 error
