import os
from groq import Groq
import base64

# Fetch the API key from environment variables
api_key = os.environ.get("GROQ_API_KEY")

# Initialize the client with the API key
client = Groq(api_key=api_key)

# List of image paths
image_paths = ["./painting.png", "./painting1.png", "./painting2.png"]

# Loop through each image path
for image_path in image_paths:
    with open(image_path, 'rb') as image_file:
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

    # Print the response from the API
    print(f"Response for {image_path}:")
    print(completion.choices[0].message.content)
    print("-" * 50)  # Divider for better readability
