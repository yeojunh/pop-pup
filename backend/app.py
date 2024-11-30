from flask import Flask
# from event_bus import EventBus
from flask_cors import CORS
import time

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # CORS configuration [allow frontend]

# event_bus = EventBus()

@app.route('/')
def index(): 
    return "Hello, World!"

@app.route('/time')
def get_current_time(): 
    return {'time': time.time()}

if __name__ == '__main__': 
    print("Server is starting...")
    app.run(debug=True)