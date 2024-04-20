import serial
import requests
import time

# Initialize serial communication with Arduino
ser = serial.Serial('COM9', 9600)  # Update the port name if necessary

# Function to send sensor data to Flask


def send_sensor_data_to_flask(temperature, humidity, mq2_value):
    try:
        api_endpoint = 'http://localhost:3000/data'
        data = {
            'temperature': temperature,
            'humidity': humidity,
            'mq2_value': mq2_value
        }
        response = requests.post(api_endpoint, json=data)
        response.raise_for_status()  # Raise an exception for HTTP errors
        # print("Sensor data sent successfully to Flask.")
    except requests.exceptions.RequestException as e:
        print("Failed to send sensor data to Flask:", e)


# Main loop to continuously read data from Arduino and send it to Flask
while True:
    try:
        # Send command to Arduino to request sensor values
        ser.write(b'r')
        time.sleep(1)  # Wait for Arduino to respond
        # Read the response and split into temperature, humidity, and MQ-2 value
        data = ser.readline().decode().strip().split(',')
        temperature = float(data[0])
        humidity = float(data[1])
        mq2_value = int(data[2])

        # Send the sensor data to Flask
        send_sensor_data_to_flask(temperature, humidity, mq2_value)

        # Wait for some time before reading again
        time.sleep(5)
    except KeyboardInterrupt:
        print("Program terminated by user.")
        break
    except Exception as e:
        print("An error occurred:", e)
