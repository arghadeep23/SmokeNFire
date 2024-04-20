from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS from flask_cors module
import logging

app = Flask(__name__)
CORS(app, origins='http://localhost:5173')
# Configure logging to a file
logging.basicConfig(filename='flask_server.log', level=logging.DEBUG)

latest_data = {
    'temperature': None,
    'humidity': None,
    'mq2_value': None
}


@app.route('/data', methods=['POST'])
def receive_data():
    global latest_data
    data = request.json
    logging.debug("Received data: %s", data)

    # Extract sensor values
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    mq2_value = data.get('mq2_value')

    logging.debug("Temperature: %s, Humidity: %s, MQ-2 Value: %s",
                  temperature, humidity, mq2_value)

    # Update latest data
    latest_data['temperature'] = temperature
    latest_data['humidity'] = humidity
    latest_data['mq2_value'] = mq2_value

    return "Data received successfully", 200


@app.route('/')
def index():
    global latest_data
    return jsonify(latest_data)


if __name__ == '__main__':
    logging.debug("Starting Flask server")
    app.run(host='0.0.0.0', port=3000, debug=True)
