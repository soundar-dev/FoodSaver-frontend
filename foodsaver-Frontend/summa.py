from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

try:
    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents="What is 1 + 1?"
    )
    print("Gemini reply:", response.text)
except Exception as e:
    print("Gemini error:", e)
