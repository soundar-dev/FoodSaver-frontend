from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from google import genai

# Load environment variables
load_dotenv()


# Create Gemini client (NEW WAY)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Flask app
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"reply": "Please type something"}), 400

    try:
        response = client.models.generate_content(
            model="models/gemini-flash-latest",
            contents=user_message
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        print("Gemini Error:", e)
        return jsonify({
            "reply": "AI service is temporarily unavailable."
        }), 500
    # except Exception as e:
    #     print("Gemini Error:", e)
    #     return jsonify({
    #         "reply": f"Gemini error: {str(e)}"
    # }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
