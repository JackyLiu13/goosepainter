import cohere

co = cohere.Client("e2FG8cmDuOJVluFg34peBFtOHK3Absgefg8BhsvB")

theme = "A journey through a magical forest."
generated_story = """
A young adventurer sets out into the forest, encountering creatures that only exist in her wildest dreams.
Trees that speak in riddles guide her to a hidden lake, where the water glows under the moonlight, revealing a forgotten path to a new realm.
"""

prompt = f"""
You will receive two inputs: a theme and a generated story. Your task is to evaluate how closely the story aligns with the given theme based on the following criteria:

Plot Relevance: Assess how much the overall storyline or narrative of the generated story aligns with the theme. Does the story naturally develop from the theme's core ideas? Are the events or actions in the story connected to the theme?

Imagery and Descriptions: Examine whether the visual or descriptive elements of the story reflect the key elements of the theme. Are the characters, objects, or settings in the story consistent with the imagery the theme evokes?

Tone and Mood: Determine if the emotional tone or mood of the story matches the feelings or atmosphere the theme would typically inspire. Does the story evoke the same emotions or energy as the theme?

Creativity: Consider how uniquely the story interprets the theme. Does the story offer an original or unexpected perspective while still maintaining relevance to the theme?

Input Structure:
Theme: {theme}
Generated Story: {generated_story}

Output Structure:
Provide a similarity score on a scale from 0 to 100, where 0 means "no relevance" and 100 means "perfect relevance." Your response should include the score, followed by a breakdown of your evaluation according to the criteria mentioned above. Don't be too generous.
"""

response = co.chat(
    message=prompt,
    model="command-light",  
    temperature=0.7,  
    max_tokens=300,  
    stop=None  
)

print("Evaluation Response:")
print(response)
