from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
app = Flask(__name__)
CORS(app)
conversation_history = list()

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/chatbot/", methods=["POST"])
def chatbot():
    global conversation_history
    
    user_input = request.json.get("userInput")
    conversation_history.append({'role': 'user', 'content': user_input})
    
    client = OpenAI(
        api_key=os.environ.get('OPENAI_KEY'),
    )

    response = client.chat.completions.create(
        messages=conversation_history,
        model="gpt-3.5-turbo",
    )
    
    choices = response.choices
    chat_completion = choices[0]
    bot_response = chat_completion.message.content
    conversation_history.append({'role': 'assistant', 'content': bot_response})
    response = {"message": bot_response, 'chats': conversation_history}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=8000)