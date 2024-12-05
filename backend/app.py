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
    if os.environ.get('IS_PROD') == 'False':
        animals = scraper.fetch_all_animals()   
        return jsonify(animals)
    else: 
        return {"message": "This endpoint is disabled in development mode."}

@app.route('/api/scraper/dogs')
def get_dogs(): 
    if os.environ.get('IS_PROD') == 'False':
        dogs = scraper.fetch_dogs()
        return jsonify(dogs)
    else:
        return {"message": "This endpoint is disabled in development mode."}

@app.route('/api/scraper/cats')
def get_cats(): 
    if os.environ.get('IS_PROD') == 'False':
        cats = scraper.fetch_cats()
        return jsonify(cats)
    else: 
        return {"message": "This endpoint is disabled in development mode."}

@app.route('/api/scraper/other')
def get_other_animals(): 
    if os.environ.get('IS_PROD') == 'False':
        other_animals = scraper.fetch_other_animals()
        return jsonify(other_animals)
    else: 
        return {"message": "This endpoint is disabled in development mode."}

@app.route('/api/scraper/post_default')
def post_default_animal(): 
    if os.environ.get('IS_PROD') == 'False':
        post = scraper.add_default_animal()
        return jsonify(post)
    else:
        return {"message": "This endpoint is disabled in production mode."}

@app.route('/api/scraper/get_default')
def get_default_animal(): 
    post = scraper.retrieve_default_animal_from_db()
    return jsonify(post)

@app.route('/api/scraper/add_test_animal')
def add_test_animal(): 
    if (os.environ.get('IS_PROD') == 'False'):
        post = scraper.add_test_animal()
        return jsonify(post)
    else: 
        return {"message": "This endpoint is disabled in production mode."}

@app.route('/api/scraper/get_test_animal')
def get_test_animal(): 
    post = scraper.get_test_animal()
    return jsonify(post)
    
if __name__ == '__main__': 
    print("Server is starting...")
    app.run(debug=True)