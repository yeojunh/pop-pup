import os
import time
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from api.scraper import Scraper

app = Flask(__name__)
scraper = Scraper()
load_dotenv()

CLIENT_API_ENDPOINT = os.environ.get('PROD_CLIENT_ENDPOINT') if os.environ.get('IS_PROD') == "True" else os.environ.get('LOCAL_CLIENT_ENDPOINT')
CORS(app, resources={r"/*": {"origins": CLIENT_API_ENDPOINT}})  # CORS configuration [allow frontend]

animals = None

@app.route('/')
def index(): 
    return "Welcome to Pop-pup! 🐶🐱\nYou're actually not supposed to be here - head over to pop-pup.netlify.app :)"

@app.route('/api/scraper/refresh_all')
def refresh_all(): 
    if os.environ.get('IS_PROD') == 'True': 
        return {"message": "This endpoint is disabled in production mode."}
    try: 
        animals = scraper.refresh_all()
        return jsonify(animals)
    except Exception as e: 
        return jsonify({"error": str(e)}), 500

@app.route('/api/scraper/get_test_animal')
def get_test_animal(): 
    post = scraper.get_test_animal()
    return jsonify(post)
    
@app.route('/api/scraper/get_animal/<string:animal_id>')
def get_animal(animal_id): 
    post = scraper.get_animal(animal_id)
    return jsonify(post)
    
if __name__ == '__main__': 
    print("Server is starting...")
    app.run(debug=True)