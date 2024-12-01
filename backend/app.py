import os
import time
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from scraper import Scraper
from flask import jsonify

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

@app.route('/api/scraper/dogs')
def get_dogs(): 
    dogs = scraper.fetch_dogs()
    return jsonify(dogs)

if __name__ == '__main__': 
    print("Server is starting...")
    app.run(debug=True)