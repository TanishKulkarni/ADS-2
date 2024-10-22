import os
import json
from pathlib import Path
import uuid
from flask import Flask, request, jsonify
import PyPDF2
from groq import Groq

app = Flask(__name__)

# Function to securely retrieve the API key
def get_api_key():
    try:
        # Retrieve the API key from environment variables
        return os.getenv("GROQ_API_KEY")  # Store in environment variable for security
    except Exception as e:
        print(f"Error retrieving API key: {e}")
        return None

# Initialize Groq Client
api_key = get_api_key()
if not api_key:
    raise ValueError("API key not found. Please set it properly.")

client = Groq(api_key=api_key)

# Function to generate unique quiz code
def generate_quiz_code():
    return str(uuid.uuid4())  # UUID ensures unique quiz codes

# Extract text from PDF
def extract_text_from_pdf(pdf_file, max_length=1500):
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        pdf_text = ""
        for page_num in range(len(reader.pages)):
            pdf_text += reader.pages[page_num].extract_text()
            if len(pdf_text) >= max_length:
                break
        return pdf_text[:max_length]  # Truncate text to max_length
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

# Convert the text into JSON format for quiz questions
def convert_text_to_json(text_content, quiz_code):
    questions = []
    lines = text_content.strip().splitlines()

    for idx, line in enumerate(lines):
        if line.strip():
            question_data = line.split('|')
            if len(question_data) >= 3:
                question = question_data[0].strip()
                options = [option.strip() for option in question_data[1:-1]]
                correct_option = question_data[-1].strip()

                question_entry = {
                    "id": idx + 1,
                    "question": question,
                    "options": options,
                    "correct_option": correct_option
                }
                questions.append(question_entry)

    quiz_json = {
        "quiz_code": quiz_code,
        "questions": questions
    }
    return quiz_json

# Function to generate quiz using Groq API
def generate_quiz_from_pdf(pdf_file, num_questions, difficulty):
    # Step 1: Extract text from the PDF
    cleaned_text_from_pdf = extract_text_from_pdf(pdf_file, max_length=1500)

    if not cleaned_text_from_pdf:
        return None, None, None

    # Step 2: Build the Groq prompt
    prompt_content = f"Generate {num_questions} multiple-choice questions based on the following text: {cleaned_text_from_pdf}"

    # Step 3: Call Groq API to generate questions
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt_content}],
            model="llama3-8b-8192"
        )

        # Step 4: Get the API response
        generated_content = chat_completion.choices[0].message.content

        # Step 5: Convert to JSON and generate quiz code
        quiz_code = generate_quiz_code()
        quiz_json = convert_text_to_json(generated_content, quiz_code)

        return quiz_code, quiz_json

    except Exception as e:
        print(f"Error during Groq API call: {e}")
        return None, None, None

# API route to generate quiz
@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    try:
        # Get the PDF file and form data from the request
        file = request.files['pdf']
        num_questions = int(request.form['questions'])
        difficulty = request.form['difficulty']

        # Call the function to generate quiz
        quiz_code, quiz_data = generate_quiz_from_pdf(file, num_questions, difficulty)

        if quiz_code and quiz_data:
            return jsonify(quiz_data), 200
        else:
            return jsonify({"error": "Failed to generate quiz"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(port=5001, debug=True)
