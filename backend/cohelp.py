from cohere import Client
from cohere import SystemMessage

client = Client(client_name="YOUR_CLIENT_NAME", token="2m1h74add4SrRlcrAoaOkcILUllR9e1Mb48rm90T" )        
output = client.chat_stream(
	message="fire, tree, person",
	model="command-light",
	chat_history=[
		SystemMessage(message="You are going to take the three phrases or words, and you are going to make a long story about it. do not include any addition system messages strictly only respond with the story", )
	],
	temperature=5
)
print(output, client)
