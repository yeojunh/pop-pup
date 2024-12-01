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

@app.route('/')
def index(): 
    return "Hello, World!"

@app.route('/time')
def get_current_time(): 
    return {'time': time.time()}

@app.route('/api/scraper/all')
def get_all(): 
    animals = scraper.fetch_all_animals()
    return jsonify(animals)

@app.route('/api/scraper/dogs')
def get_dogs(): 
    dogs = scraper.fetch_dogs()
    return jsonify(dogs)

@app.route('/api/scraper/cats')
def get_cats(): 
    cats = scraper.fetch_cats()
    return jsonify(cats)

@app.route('/api/scraper/other')
def get_other_animals(): 
    other_animals = scraper.fetch_other_animals()
    return jsonify(other_animals)

if __name__ == '__main__': 
    print("Server is starting...")
    app.run(debug=True)