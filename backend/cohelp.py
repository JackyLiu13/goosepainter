from cohere import Client
from cohere import SystemMessage, UserMessage
import cohere

co = cohere.Client("2m1h74add4SrRlcrAoaOkcILUllR9e1Mb48rm90T")

def genStory (word1,word2,word3):
    response = co.chat(
        
        message= word1 + ", " + word2 + ", " + word3,
        model="command-light",
        chat_history=[
            {"role": "USER", "message":"You are going to take the three phrases or words, and you are going to make a long story about it. do not include any addition system messages strictly only respond with the story"}
        ],
        temperature=2.4
    )

    return response.text

# SAMPLE
# res = genStory("The cat", "jumped", "over the moon")
# print(res)
