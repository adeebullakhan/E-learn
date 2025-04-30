from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI  # ✅ Correct import for latest OpenAI SDK

# Load environment variables
load_dotenv()

# ✅ Initialize client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message", "")
    print("📥 Received input:", user_input)

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_input}]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"reply": "Sorry, there was an error.", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)